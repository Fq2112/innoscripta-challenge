<?php

namespace App\Http\Controllers\api;

use App\Helpers\EnvHelper;
use App\Http\Controllers\Controller;
use App\Models\LogNewsDate;
use App\Models\News;
use App\Models\NewsAuthor;
use App\Models\NewsSource;
use App\Traits\apiResponseTrait;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Illuminate\Http\Request;
use jcobhams\NewsApi\NewsApi;
use Symfony\Component\HttpFoundation\Response;

class NewsController extends Controller
{
    use apiResponseTrait;

    private $name;
    private $model;

    public function __construct()
    {
        $this->name = __('vars.models.News');
        $this->model = new News();
    }

    /**
     * get news list
     *
     * @param string $q (?q=news_title|news_description|news_content)
     * @param string $language (&language=language_code1,language_code2,etc...)
     * @param string $category (&category=category_code1,category_code2,etc...)
     * @param string $country (&country=country_code1,country_code2,etc...)
     * @param string $source (&source=source_code1,source_code2,etc...)
     * @param string $author (&author=author_code1,author_code2,etc...)
     * @return [{data: [id: row_id, title: news_title, description: news_description, content: news_content, permalink: news_permalink, url: news_url, url_to_image: news_url_to_image, published_at: news_published_at source_name: source_name, source_desc: source_desc, source_url: source_url, language_code: language_code, country_code: country_code, category: news_category_name, author: news_author_name]}]
     */
    public function listNews(Request $request)
    {
        $request->validate($this->model->requestList([
            'except' => [
                'show_trash_data', 'only_active'
            ],
        ]));

        try {
            $limit = $request->limit ?? 10;
            $data = $this->model->newsList()->paginate($limit);

            return $this->responseLoadDataSuccess($data, $this->name, true);
        } catch (\Throwable $e) {
            return $this->responseLoadDataFailed($e, $this->name);
        }
    }

    /**
     * to sync the latest data from NewsAPI
     * by date range
     */
    public function syncNews(Request $request)
    {
        $countData = 0;
        $isError = false;

        if (!$request->has(['start_date', 'end_date'])) {
            return response(['message' => __('validation.required', ['attribute' => 'start_date and end_date'])], Response::HTTP_BAD_REQUEST);
        }

        $start = Carbon::parse($request->start_date)->format('Y-m-d');
        $end = Carbon::parse($request->end_date)->format('Y-m-d');
        if ($start > $end) {
            return response(['message' => __('validation.after', ['attribute' => 'end_date', 'date' => 'start_date'])], Response::HTTP_BAD_REQUEST);
        }

        // Iterate over the period
        $periods = CarbonPeriod::create($start, $end)->toArray();
        if (count($periods) > 5) {
            return response(['message' => 'Max sync request range is 5 days!'], Response::HTTP_TOO_MANY_REQUESTS);
        }

        $existingLogs = LogNewsDate::whereIn('date', collect($periods)->map(fn ($q) => $q->format('Y-m-d'))->toArray())->get()->pluck('date')->toArray();
        $logs = collect($periods)->filter(fn ($q) => in_array($q, $existingLogs));
        $sources = NewsSource::all()->pluck('code')->chunk(15)->toArray();

        try {
            $newsapi = new NewsApi(EnvHelper::get('NEWSAPI_KEY'));
            foreach ($logs as $log) {
                $stopIter = false;
                $page = 1;
                while (!$stopIter && $page < 5) {
                    $res = $newsapi->getEverything(sources: implode(",", $sources), from: $log, to: $log, page: $page);
                    if (ceil($res->totalResults / 100) == $page) {
                        $stopIter = true;
                    }

                    $authors = [];
                    $count = NewsAuthor::count();
                    foreach ($sources as $val) {
                        $arr = collect($res->articles)->where('source.id', $val)->pluck('author');
                        $existingAuthor = NewsAuthor::whereIn('name', collect($arr)->unique())->where('source_code', $val)->get()->pluck('name');
                        $authors = [...$authors, ...collect($arr)->filter(fn ($q) => !in_array($q, $existingAuthor->toArray()) && $q)->map(fn ($q, $i) => [
                            'name' => $q ? $q : 'anonymous',
                            'source_code' => $val,
                            'code' => 'AU-' . str()->padLeft($count + $i + 1, 6, '0') . str()->random(rand(4, 10)),
                            'created_at' => now(),
                            'updated_at' => now(),
                        ])->unique('name')->toArray()];
                    }

                    if (count($authors) > 0) {
                        NewsAuthor::insert($authors);
                    }

                    if (count($res->articles) > 0) {
                        News::insert(
                            collect($res->articles)->map(function ($q) use ($authors) {
                                $auh = collect($authors)->filter(fn ($x) => $x['name'] == ($q->author ? $q->author : 'anonymous'))->toArray();
                                return [
                                    'source_code' => $q->source->id,
                                    'author_code' => is_array($auh) && count($auh) > 0 && isset($auh[0]) ? $auh[0]['code'] : null,
                                    'title' => $q->title,
                                    'permalink' => preg_replace("![^a-z0-9]+!i", "-", strtolower($q->title) . "-" . rand(111, 999)),
                                    'description' => $q->description,
                                    'url' => $q->url,
                                    'url_to_image' => $q->urlToImage,
                                    'published_at' => \Carbon\Carbon::parse($q->publishedAt),
                                    'content' => $q->content,
                                    'created_at' => now(),
                                    'updated_at' => now(),
                                ];
                            })->toArray()
                        );
                    }

                    $page++;
                    $countData++;
                }
            }
        } catch (\Exception $e) {
            if ($countData === 0) {
                $isError = $e;
            }
        }

        LogNewsDate::insert(collect($logs)->map(fn ($q) => [
            'date' => $q,
            'created_at' => now(),
            'updated_at' => now(),
        ])->toArray());

        if ($isError) {
            return $this->responseCustomFailed($isError, "Failed to sync news data!");
        }
        return $this->responseCustomSuccess("Successfully synced $countData news data!");
    }
}

module.exports = [
  /**
   * 1 知乎日报 api 参考：
   * https://github.com/izzyleung/ZhihuDailyPurify/wiki/%E7%9F%A5%E4%B9%8E%E6%97%A5%E6%8A%A5-API-%E5%88%86%E6%9E%90
   * 
   */
  {
    host: 'http://news-at.zhihu.com',
    context: 'ribao',
    rewrite: true,
  },
  // 天气 api 参考 https://github.com/jokermonn/-Api/blob/master/MXWeather.md
  {
    host: 'http://aider.meizu.com/app/weather/listWeather/',
    context: 'weather',
    rewrite: true,
  },
  // 豆瓣API 参考 https://developers.douban.com/wiki/?title=api_v2
  {
    host: 'https://api.douban.com/v2/',
    context: 'douban',
    rewrite: true,
  }
]
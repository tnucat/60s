import pkg from '../package.json' with { type: 'json' }

import { Router } from '@oak/oak/router'
import { config } from './config/index.ts'

import { service60s } from './module/60s.module.ts'
import { serviceBaike } from './module/baike.module.ts'
import { serviceBili } from './module/bili.module.ts'
import { serviceBing } from './module/bing.module.ts'
import { serviceChangYa } from './module/changya.module.ts'
import { serviceDouyin } from './module/douyin.module.ts'
import { serviceEpic } from './module/epic.module.ts'
import { serviceExRate } from './module/exchange-rate.module.ts'
import { serviceFabing } from './module/fabing/fabing.module.ts'
import { serviceHitokoto } from './module/hitokoto/hitokoto.module.ts'
import { serviceIP } from './module/ip.module.ts'
import { serviceTodayInHistory } from './module/today-in-history.module.ts'
import { serviceToutiao } from './module/toutiao.module.ts'
import { serviceWeibo } from './module/weibo.module.ts'
import { serviceZhihu } from './module/zhihu.module.ts'
import { serviceDuanzi } from './module/duanzi/duanzi.module.ts'
import { serviceAnswer } from './module/answer/answer.module.ts'
import { serviceLuck } from './module/luck/luck.module.ts'
import { serviceHash } from './module/hash.module.ts'
import { serviceFanyi } from './module/fanyi/fanyi.module.ts'
import { serviceOG } from './module/og.module.ts'
import { serviceMD2HTML } from './module/md2html/md2html.module.ts'

export const rootRouter = new Router()

rootRouter.get('/', (ctx) => {
  ctx.response.headers.set('Content-Type', 'application/json; charset=utf-8')
  ctx.response.body = JSON.stringify(
    {
      author: config.author,
      user_group: config.group,
      github_repo: config.github,
      api_version: pkg.version,
      updated: pkg.updateTime,
      updated_at: new Date(pkg.updateTime).getTime(),
      endpoints: Array.from(appRouter.entries(), ([_, v]) => v.path),
    },
    null,
    2,
  )
})

export const appRouter = new Router({
  prefix: '/v2',
})

appRouter.get('/60s', service60s.handle())
appRouter.get('/baike', serviceBaike.handle())
appRouter.get('/bili', serviceBili.handle())
appRouter.get('/bing', serviceBing.handle())
appRouter.get('/douyin', serviceDouyin.handle())
appRouter.get('/epic', serviceEpic.handle())
appRouter.get('/exchange_rate', serviceExRate.handle())
appRouter.get('/today_in_history', serviceTodayInHistory.handle())
appRouter.get('/toutiao', serviceToutiao.handle())
appRouter.get('/weibo', serviceWeibo.handle())
appRouter.get('/zhihu', serviceZhihu.handle())
appRouter.get('/changya', serviceChangYa.handle())
appRouter.get('/ip', serviceIP.handle())
appRouter.get('/hitokoto', serviceHitokoto.handle())
appRouter.get('/fabing', serviceFabing.handle())
appRouter.get('/duanzi', serviceDuanzi.handle())
appRouter.get('/answer', serviceAnswer.handle())
appRouter.get('/luck', serviceLuck.handle())

appRouter.all('/og', serviceOG.handle())
appRouter.all('/hash', serviceHash.handle())
appRouter.all('/md2html', serviceMD2HTML.handle())

appRouter.all('/fanyi', serviceFanyi.handle())
appRouter.all('/fanyi/langs', serviceFanyi.langs())

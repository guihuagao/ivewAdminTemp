import Main from '@/components/main'
import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/',
    name: 'home',
    redirect: '/home',
    component: Main,
    meta: {
      routerId: '1',
      title: '首页',
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          title: '首页',
          notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/view/single-page/home')
      }
    ]
  },
  // 用户管理
  {
    path: '/user',
    name: 'user',
    meta: {
      icon: 'md-radio',
      title: '用户管理',
      routerId: '2',
    },
    component: Main,
    children: [
      {
        path: 'information',
        name: 'information',
        meta: {
          icon: 'md-grid',
          title: '基本信息'
        },
        component: () => import('@/view/user/information.vue')
      },
      {
        path: 'messageShare',
        name: 'messageShare',
        meta: {

          icon: 'md-grid',
          title: '用户资讯分享'
        },
        component: () => import('@/view/user/messageShare.vue')
      },
      {
        path: 'videoShare',
        name: 'videoShare',
        meta: {

          icon: 'md-grid',
          title: '用户视频分享'
        },
        component: () => import('@/view/user/videoShare.vue')
      },
      {
        path: 'consumptionRecord',
        name: 'consumptionRecord',
        meta: {

          icon: 'md-grid',
          title: '消费记录'
        },
        component: () => import('@/view/user/consumptionRecord.vue')
      }

    ]
  },
  // 用户分析
  {
    path: '/userAnalyze',
    name: 'userAnalyze',
    meta: {
      icon: 'md-radio',
      title: '用户分析',
      routerId: '3',
    },
    component: Main,
    children: [
      {
        path: 'registerUser',
        name: 'registerUser',
        meta: {
          icon: 'md-grid',
          title: '注册用户'
        },
        component: () => import('@/view/userAnalyze/registerUser.vue')
      },{
        path: 'payUser',
        name: 'payUser',
        meta: {
          icon: 'md-grid',
          title: '付费用户'
        },
        component: () => import('@/view/userAnalyze/payUser.vue')
      },{
        path: 'premiumUser',
        name: 'premiumUser',
        meta: {
          icon: 'md-grid',
          title: '退费用户'
        },
        component: () => import('@/view/userAnalyze/premiumUser.vue')
      }
    ]
  },
  // 用户上传信息管理
  {
    path: '/userUpload',
    name: 'userUpload',
    meta: {
      icon: 'md-radio',
      title: '用户上传信息管理',
      routerId: '4',
    },
    component: Main,
    children: [
      {
        path: 'userUploadInformation',
        name: 'userUploadInformation',
        meta: {
          icon: 'md-radio',
          title: '粘贴外部网站审核'
        },
        component: () => import('@/view/userUploadInformation/userUploadInformation.vue')
      }
    ]
  },

  // 企业管理
  {
    path: '/prise',
    name: 'prise',
    meta: {
      icon: 'md-radio',
      title: '企业管理',
      routerId: '5',
    },
    component: Main,
    children: [
      {
        path: 'enterprise',
        name: 'enterprise',
        meta: {
          icon: 'md-grid',
          title: '企业管理'
        },
        component: () => import('@/view/enterprise/enterprise.vue')
      }
    ]
  },
  // 站内资讯管理
  {
    path: '/instationMessage',
    name: 'instationMessage',
    meta: {
      icon: 'md-radio',
      title: '站内资讯管理',
      routerId: '6',
    },
    component: Main,
    children: [
      {
        path: 'instationMessageUp',
        name: 'instationMessageUp',
        meta: {
          icon: 'md-grid',
          title: '一般上传'
        },
        component: () => import('@/view/instationMessage/instationMessageUp.vue')
      },
      {
        path: 'instationMessageStickup',
        name: 'instationMessageStickup',
        meta: {
          icon: 'md-grid',
          title: '一键粘贴'
        },
        component: () => import('@/view/instationMessage/instationMessageStickup.vue')
      }
    ]
  },
  // 站内视频管理
  {
    path: '/instationVideo',
    name: 'instationVideo',
    meta: {
      icon: 'md-radio',
      title: '站内视频管理',
      routerId: '7',
    },
    component: Main,
    children: [
      {
        path: 'instationVideoUp',
        name: 'instationVideoUp',
        meta: {
          icon: 'md-grid',
          title: '一般上传'
        },
        component: () => import('@/view/instationVideo/instationVideoUp.vue')
      },{
        path: 'instationVideoStickup',
        name: 'instationVideoStickup',
        meta: {
          icon: 'md-grid',
          title: '一键粘贴'
        },
        component: () => import('@/view/instationVideo/instationVideoStickup.vue')
      }
    ]
  },
  // 上传资讯视频
  {
    path: '/uploadingAd',
    name: 'uploadingAd',
    meta: {
      icon: 'md-radio',
      title: '上传资讯视频',
      routerId: '8',
    },
    component: Main,
    children: [
      {
        path: 'informationUp',
        name: 'informationUp',
        meta: {
          icon: 'md-grid',
          title: '资讯'
        },
        component: () => import('@/view/uploadingAd/informationUp.vue')
      },{
        path: 'videoUp',
        name: 'videoUp',
        meta: {
          icon: 'md-grid',
          title: '视频'
        },
        component: () => import('@/view/uploadingAd/videoUp.vue')
      }
    ]
  },
  // 资金管理
  {
    path: '/capitalAd',
    name: 'capitalAd',
    meta: {
      icon: 'md-radio',
      title: '资金管理',
      routerId: '9',
    },
    component: Main,
    children: [
      {
        path: 'balance',
        name: 'balance',
        meta: {
          icon: 'md-grid',
          title: '资金余额'
        },
        component: () => import('@/view/capitalAd/balance.vue')
      },{
        path: 'withdraw',
        name: 'withdraw',
        meta: {
          icon: 'md-grid',
          title: '提现审核'
        },
        component: () => import('@/view/capitalAd/withdraw.vue')
      }
    ]
  },
  // 委托设计广告
  {
    path: '/entrustDesign',
    name: 'entrustDesign',
    meta: {
      icon: 'md-radio',
      title: '委托设计广告',
      routerId: '10',
    },
    component: Main,
    children: [
      {
        path: 'deliveryRecord',
        name: 'deliveryRecord',
        meta: {
          icon: 'md-grid',
          title: '交付记录'
        },
        component: () => import('@/view/entrustDesign/deliveryRecord.vue')
      },{
        path: 'entrustDesignRecord',
        name: 'entrustDesignRecord',
        meta: {
          icon: 'md-grid',
          title: '委托设计记录'
        },
        component: () => import('@/view/entrustDesign/entrustDesignRecord.vue')
      }
    ]
  },
  // 消息管理
  {
    path: '/messageAd',
    name: 'messageAd',
    meta: {
      icon: 'md-radio',
      title: '消息管理',
      routerId: '11',
    },
    component: Main,
    children: [
      {
        path: 'systemMessage',
        name: 'systemMessage',
        meta: {
          icon: 'md-grid',
          title: '系统消息'
        },
        component: () => import('@/view/messageAd/systemMessage.vue')
      },{
        path: 'userInform',
        name: 'userInform',
        meta: {
          icon: 'md-grid',
          title: '用户举报'
        },
        component: () => import('@/view/messageAd/userInform.vue')
      },{
        path: 'feedback',
        name: 'feedback',
        meta: {
          icon: 'md-grid',
          title: '意见反馈'
        },
        component: () => import('@/view/messageAd/feedback.vue')
      }
    ]
  },
  // 大图通栏闪爆全城管理
  {
    path: '/layoutBigImg',
    name: 'layoutBigImg',
    meta: {
      icon: 'md-radio',
      title: '大图通栏闪爆全城管理',
      routerId: '12',
    },
    component: Main,
    children: [
      {
        path: 'toAuditBigImg',
        name: 'toAuditBigImg',
        meta: {
          icon: 'md-grid',
          title: '待审核'
        },
        component: () => import('@/view/layoutBigImg/toAuditBigImg.vue')
      },{
        path: 'underwayBigImg',
        name: 'underwayBigImg',
        meta: {
          icon: 'md-grid',
          title: '进行中'
        },
        component: () => import('@/view/layoutBigImg/underwayBigImg.vue')
      },{
        path: 'terminationBigImg',
        name: 'terminationBigImg',
        meta: {
          icon: 'md-grid',
          title: '终止'
        },
        component: () => import('@/view/layoutBigImg/terminationBigImg.vue')
      },
      {
        path: 'forbiddenBigImg',
        name: 'forbiddenBigImg',
        meta: {
          icon: 'md-grid',
          title: '禁用'
        },
        component: () => import('@/view/layoutBigImg/forbiddenBigImg.vue')
      }
    ]
  },
  // 贴片闪爆全城管理
  {
    path: '/layoutPaster',
    name: 'layoutPaster',
    meta: {
      icon: 'md-radio',
      title: '贴片闪爆全城管理',
      routerId: '13',
    },
    component: Main,
    children: [
      {
        path: 'toAuditPaster',
        name: 'toAuditPaster',
        meta: {
          icon: 'md-grid',
          title: '待审核'
        },
        component: () => import('@/view/layoutPaster/toAuditPaster.vue')
      },{
        path: 'underwayPaster',
        name: 'underwayPaster',
        meta: {
          icon: 'md-grid',
          title: '进行中'
        },
        component: () => import('@/view/layoutPaster/underwayPaster.vue')
      },{
        path: 'terminationPaster',
        name: 'terminationPaster',
        meta: {
          icon: 'md-grid',
          title: '终止'
        },
        component: () => import('@/view/layoutPaster/terminationPaster.vue')
      },
      {
        path: 'forbiddenPaster',
        name: 'forbiddenPaster',
        meta: {
          icon: 'md-grid',
          title: '禁用'
        },
        component: () => import('@/view/layoutPaster/forbiddenPaster.vue')
      }
    ]
  },
  // 视频闪爆全城管理
  {
    path: '/layoutVideo',
    name: 'layoutVideo',
    meta: {
      icon: 'md-radio',
      title: '视频闪爆全城管理',
      routerId: '14',
    },
    component: Main,
    children: [
      {
        path: 'toAuditVideo',
        name: 'toAuditVideo',
        meta: {
          icon: 'md-grid',
          title: '待审核'
        },
        component: () => import('@/view/layoutVideo/toAuditVideo.vue')
      },{
        path: 'underwayVideo',
        name: 'underwayVideo',
        meta: {
          icon: 'md-grid',
          title: '进行中'
        },
        component: () => import('@/view/layoutVideo/underwayVideo.vue')
      },{
        path: 'terminationVideo',
        name: 'terminationVideo',
        meta: {
          icon: 'md-grid',
          title: '终止'
        },
        component: () => import('@/view/layoutVideo/terminationVideo.vue')
      },
      {
        path: 'forbiddenVideo',
        name: 'forbiddenVideo',
        meta: {
          icon: 'md-grid',
          title: '禁用'
        },
        component: () => import('@/view/layoutVideo/forbiddenVideo.vue')
      }
    ]
  },
  // 大图通栏广告互推管理
  {
    path: '/layoutBigImgAd',
    name: 'layoutBigImgAd',
    meta: {
      icon: 'md-radio',
      title: '大图通栏广告互推管理',
      routerId: '15',
    },
    component: Main,
    children: [
      {
        path: 'toAuditBigImgAd',
        name: 'toAuditBigImgAd',
        meta: {
          icon: 'md-grid',
          title: '待审核'
        },
        component: () => import('@/view/layoutBigImgAd/toAuditBigImgAd.vue')
      },{
        path: 'underwayBigImgAd',
        name: 'underwayBigImgAd',
        meta: {
          icon: 'md-grid',
          title: '进行中'
        },
        component: () => import('@/view/layoutBigImgAd/underwayBigImgAd.vue')
      },{
        path: 'terminationBigImgAd',
        name: 'terminationBigImgAd',
        meta: {
          icon: 'md-grid',
          title: '终止'
        },
        component: () => import('@/view/layoutBigImgAd/terminationBigImgAd.vue')
      },
      {
        path: 'forbiddenBigImgAd',
        name: 'forbiddenBigImgAd',
        meta: {
          icon: 'md-grid',
          title: '禁用'
        },
        component: () => import('@/view/layoutBigImgAd/forbiddenBigImgAd.vue')
      }
    ]
  },
  // 贴片广告互推管理
  {
    path: '/layoutPasterAd',
    name: 'layoutPasterAd',
    meta: {
      icon: 'md-radio',
      title: '贴片广告互推管理',
      routerId: '16',
    },
    component: Main,
    children: [
      {
        path: 'toAuditPasterAd',
        name: 'toAuditPasterAd',
        meta: {
          icon: 'md-grid',
          title: '待审核'
        },
        component: () => import('@/view/layoutPasterAd/toAuditPasterAd.vue')
      },{
        path: 'underwayPasterAd',
        name: 'underwayPasterAd',
        meta: {
          icon: 'md-grid',
          title: '进行中'
        },
        component: () => import('@/view/layoutPasterAd/underwayPasterAd.vue')
      },{
        path: 'terminationPasterAd',
        name: 'terminationPasterAd',
        meta: {
          icon: 'md-grid',
          title: '终止'
        },
        component: () => import('@/view/layoutPasterAd/terminationPasterAd.vue')
      },
      {
        path: 'forbiddenPasterAd',
        name: 'forbiddenPasterAd',
        meta: {
          icon: 'md-grid',
          title: '禁用'
        },
        component: () => import('@/view/layoutPasterAd/forbiddenPasterAd.vue')
      }
    ]
  },
  // 视频广告互推管理
  {
    path: '/layoutVideoAd',
    name: 'layoutVideoAd',
    meta: {
      icon: 'md-radio',
      title: '视频广告互推管理',
      routerId: '17',
    },
    component: Main,
    children: [
      {
        path: 'toAuditVideoAd',
        name: 'toAuditVideoAd',
        meta: {
          icon: 'md-grid',
          title: '待审核'
        },
        component: () => import('@/view/layoutVideoAd/toAuditVideoAd.vue')
      },{
        path: 'underwayVideoAd',
        name: 'underwayVideoAd',
        meta: {
          icon: 'md-grid',
          title: '进行中'
        },
        component: () => import('@/view/layoutVideoAd/underwayVideoAd.vue')
      },{
        path: 'terminationVideoAd',
        name: 'terminationVideoAd',
        meta: {
          icon: 'md-grid',
          title: '终止'
        },
        component: () => import('@/view/layoutVideoAd/terminationVideoAd.vue')
      },
      {
        path: 'forbiddenVideoAd',
        name: 'forbiddenVideoAd',
        meta: {
          icon: 'md-grid',
          title: '禁用'
        },
        component: () => import('@/view/layoutVideoAd/forbiddenVideoAd.vue')
      }
    ]
  },

  // 通栏广告模板审核
  {
    path: '/reviewTemplate',
    name: 'reviewTemplate',
    meta: {
      icon: 'md-radio',
      title: '通栏广告模板审核',
      routerId: '18',
    },
    component: Main,
    children: [
      {
        path: 'toAuditReview',
        name: 'toAuditReview',
        meta: {
          icon: 'md-grid',
          title: '待审核'
        },
        component: () => import('@/view/reviewTemplate/toAuditReview.vue')
      },{
        path: 'underwayReview',
        name: 'underwayReview',
        meta: {
          icon: 'md-grid',
          title: '已通过'
        },
        component: () => import('@/view/reviewTemplate/underwayReview.vue')
      },{
        path: 'forbiddenReview',
        name: 'forbiddenReview',
        meta: {
          icon: 'md-grid',
          title: '禁用'
        },
        component: () => import('@/view/reviewTemplate/forbiddenReview.vue')
      }
    ]
  },
  // 站点系统管理
  {
    path: '/system',
    name: 'system',
    meta: {
      icon: 'md-radio',
      title: '站点系统管理',
      routerId: '19',
    },
    component: Main,
    children: [
      {
        path: 'administratorSet',
        name: 'administratorSet',
        meta: {
          icon: 'md-grid',
          title: '管理员设置'
        },
        component: () => import('@/view/system/administratorSet.vue')
      },{
        path: 'channelSet',
        name: 'channelSet',
        meta: {
          icon: 'md-grid',
          title: '频道设置'
        },
        component: () => import('@/view/system/channelSet.vue')
      },{
        path: 'industrySet',
        name: 'industrySet',
        meta: {
          icon: 'md-grid',
          title: '行业设置'
        },
        component: () => import('@/view/system/industrySet.vue')
      },{
        path: 'tearchVideoUp',
        name: 'tearchVideoUp',
        meta: {
          icon: 'md-grid',
          title: '教学视频上传'
        },
        component: () => import('@/view/system/tearchVideoUp.vue')
      },{
        path: 'issueSet',
        name: 'issueSet',
        meta: {
          icon: 'md-grid',
          title: '常见问题设置'
        },
        component: () => import('@/view/system/issueSet.vue')
      },{
        path: 'messageBannerSet',
        name: 'messageBannerSet',
        meta: {
          icon: 'md-grid',
          title: '资讯轮播图设置'
        },
        component: () => import('@/view/system/messageBannerSet.vue')
      },{
        path: 'agreementSet',
        name: 'agreementSet',
        meta: {
          icon: 'md-grid',
          title: '协议设置'
        },
        component: () => import('@/view/system/agreementSet.vue')
      },{
        path: 'systemParameter',
        name: 'systemParameter',
        meta: {
          icon: 'md-grid',
          title: '系统参数'
        },
        component: () => import('@/view/system/systemParameter.vue')
      },{
        path: 'operationLog',
        name: 'operationLog',
        meta: {
          icon: 'md-grid',
          title: '操作日志'
        },
        component: () => import('@/view/system/operationLog.vue')
      }
    ]
  },
  // {
  //   path: '/message',
  //   name: 'message',
  //   component: Main,
  //   meta: {
  //     hideInBread: true,
  //     hideInMenu: true
  //   },
  //   children: [
  //     {
  //       path: 'message_page',
  //       name: 'message_page',
  //       meta: {
  //         icon: 'md-notifications',
  //         title: '消息中心'
  //       },
  //       component: () => import('@/view/single-page/message/index.vue')
  //     }
  //   ]
  // },
//   {
//     path: '/components',
//     name: 'components',
//     meta: {
//       icon: 'logo-buffer',
//       title: '组件'
//     },
//     component: Main,
//     children: [


//       {
//         path: 'tree_table_page',
//         name: 'tree_table_page',
//         meta: {
//           icon: 'md-git-branch',
//           title: '树状表格'
//         },
//         component: () => import('@/view/components/tree-table/index.vue')
//       },

//       {
//         path: 'tables_page',
//         name: 'tables_page',
//         meta: {
//           icon: 'md-grid',
//           title: '多功能表格'
//         },
//         component: () => import('@/view/components/tables/tables.vue')
//       },

//  /*     {
//         path: 'markdown_page',
//         name: 'markdown_page',
//         meta: {
//           icon: 'logo-markdown',
//           title: 'Markdown编辑器'
//         },
//         component: () => import('@/view/components/markdown/markdown.vue')
//       },
//       {
//         path: 'editor_page',
//         name: 'editor_page',
//         meta: {
//           icon: 'ios-create',
//           title: '富文本编辑器'
//         },
//         component: () => import('@/view/components/editor/editor.vue')
//       },
//       {
//         path: 'icons_page',
//         name: 'icons_page',
//         meta: {
//           icon: '_bear',
//           title: '自定义图标'
//         },
//         component: () => import('@/view/components/icons/icons.vue')
//       },*/

//       {
//         path: '/update',
//         name: 'update',
//         meta: {
//           icon: 'md-cloud-upload',
//           title: '数据上传'
//         },
//         component: parentView,
//         children: [
//           {
//             path: 'update_table_page',
//             name: 'update_table_page',
//             meta: {
//               icon: 'ios-document',
//               title: '上传Csv'
//             },
//             component: () => import('@/view/components/update/update-table.vue')
//           },
//           {
//             path: 'update_paste_page',
//             name: 'update_paste_page',
//             meta: {
//               icon: 'md-clipboard',
//               title: '粘贴表格数据'
//             },
//             component: () => import('@/view/components/update/update-paste.vue')
//           }
//         ]
//       },


//       {
//         path: '/excel',
//         name: 'excel',
//         meta: {
//           icon: 'ios-stats',
//           title: 'EXCEL导入导出'
//         },
//         component: parentView,
//         children: [
//           {
//             path: 'upload-excel',
//             name: 'upload-excel',
//             meta: {
//               icon: 'md-add',
//               title: '导入EXCEL'
//             },
//             component: () => import('@/view/components/excel/upload-excel.vue')
//           },
//           {
//             path: 'export-excel',
//             name: 'export-excel',
//             meta: {
//               icon: 'md-download',
//               title: '导出EXCEL'
//             },
//             component: () => import('@/view/components/excel/export-excel.vue')
//           }
//         ]
//       },
//       {
//         path: '/i18n',
//         name: 'i18n',
//         meta: {
//           hideInBread: true
//         },
//         component: parentView,
//         children: [
//           {
//             path: 'i18n_page',
//             name: 'i18n_page',
//             meta: {
//               icon: 'md-planet',
//               title: 'i18n - {{ i18n_page }}'
//             },
//             component: () => import('@/view/components/i18n/i18n-page.vue')
//           }
//         ]
//       },
//       {
//         path: '/tools_methods',
//         name: 'tools_methods',
//         meta: {
//           hideInBread: true
//         },
//         component: parentView,
//         children: [
//           {
//             path: 'tools_methods_page',
//             name: 'tools_methods_page',
//             meta: {
//               icon: 'ios-hammer',
//               title: '工具方法',
//               beforeCloseName: 'before_close_normal'
//             },
//             component: () => import('@/view/components/tools-methods/tools-methods.vue')
//           }
//         ]
//       },


//       {
//         path: '/directive',
//         name: 'directive',
//         meta: {
//           hideInBread: true
//         },
//         component: parentView,
//         children: [
//           {
//             path: 'directive_page',
//             name: 'directive_page',
//             meta: {
//               icon: 'ios-navigate',
//               title: '指令'
//             },
//             component: () => import('@/view/components/directive/directive.vue')
//           }
//         ]
//       },
//     ]
//   },


  // {
  //   path: '/argu',
  //   name: 'argu',
  //   meta: {
  //     hideInMenu: true
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'params/:id',
  //       name: 'params',
  //       meta: {
  //         icon: 'md-flower',
  //         title: route => `{{ params }}-${route.params.id}`,
  //         notCache: true,
  //         beforeCloseName: 'before_close_normal'
  //       },
  //       component: () => import('@/view/components/argu-page/params.vue')
  //     },
  //     {
  //       path: 'query',
  //       name: 'query',
  //       meta: {
  //         icon: 'md-flower',
  //         title: route => `{{ query }}-${route.query.id}`,
  //         notCache: true
  //       },
  //       component: () => import('@/view/components/argu-page/query.vue')
  //     }
  //   ]
  // },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }
]

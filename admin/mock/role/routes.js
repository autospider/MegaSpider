// Just a mock data

const constantRoutes = [
  {
    path: '/redirect',
    component: 'layout/Layout',
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: 'views/redirect/index'
      }
    ]
  },
  {
    path: '/login',
    component: 'views/login/index',
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: 'views/login/auth-redirect',
    hidden: true
  },
  {
    path: '/404',
    component: 'views/error-page/404',
    hidden: true
  },
  {
    path: '/401',
    component: 'views/error-page/401',
    hidden: true
  },
  {
    path: '',
    component: 'layout/Layout',
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: 'views/dashboard/index',
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  },
  // {
  //   path: '/documentation',
  //   component: 'layout/Layout',
  //   children: [
  //     {
  //       path: 'index',
  //       component: 'views/documentation/index',
  //       name: 'Documentation',
  //       meta: { title: 'Documentation', icon: 'documentation', affix: true }
  //     }
  //   ]
  // },
  // {
  //   path: '/guide',
  //   component: 'layout/Layout',
  //   redirect: '/guide/index',
  //   children: [
  //     {
  //       path: 'index',
  //       component: 'views/guide/index',
  //       name: 'Guide',
  //       meta: { title: 'Guide', icon: 'guide', noCache: true }
  //     }
  //   ]
  // }
]
// const asyncRoutes =[
//   {
//     path: '/permission',
//     component: Layout,
//     redirect: '/permission/page',
//     alwaysShow: true, // will always show the root menu
//     name: 'Permission',
//     meta: {
//       title: 'Permission',
//       icon: 'lock',
//       roles: ['admin','editor'] // you can set roles in root nav
//     },
//     children: [
//       {
//         path: 'page',
//         component: () => import('@/views/permission/page'),
//         name: 'PagePermission',
//         meta: {
//           title: 'Page Permission',
//           roles: ['admin','editor'] // or you can only set roles in sub nav
//         }
//       },
//       {
//         path: 'role',
//         component: () => import('@/views/permission/role'),
//         name: 'RolePermission',
//         meta: {
//           title: 'Role Permission',
//           roles: ['admin']
//         }
//       }
//     ]
//   },
//   {
//     path: '/my-form',
//     component: Layout,
//     children: [
//       {
//         path: 'index',
//         component: () => import('@/views/spider/index'),
//         name: 'taskIndex',
//         // meta: { title: '我的表单', icon: 'icon', noCache: false }
//         meta: { title: '项目', icon: 'list', noCache: false }
//       }
//     ]
//   },
//   {
//     path: '/tinymce',
//     component: Layout,
//     // redirect: 'noRedirect',
//     redirect: '/tinymce/index',
//     name: 'spider',
//     meta: {
//       title: '爬虫列表',
//       icon: 'bug',
//       // noCache: false
//     },
//     children: [
//       {
//         path: 'index',
//         component: () => import('@/views/spider/spiderList'),
//         name: 'spiderIndex',
//         meta: { title: '爬虫', icon: 'bug', noCache: false }
//       },
//       {
//         path: 'spiderTest',
//         component: () => import('@/views/spider/addConfig'),
//         name: '添加配置',
//         hidden: true,
//         // redirect: '/permission/page',
//         meta: { title: 'addConfig', noCache: true, icon: 'lock',roles: ['admin'] }
//       },
//       {
//         path: 'dynamicOperationTable',
//         component: () => import('@/views/spider/dynamicOperationTable'),
//         name: '动态操作表格',
//         hidden: true,
//         meta: { title: 'dynamicOperationTable', noCache: true, icon: 'lock' }
//       }
//     ]
//   },
//
//   {
//     path: '/sign',
//     component: Layout,
//     children: [
//       {
//         path: 'index',
//         component: () => import('@/views/sign/index'),
//         name: 'sign',
//         meta: { title: '文档说明', icon: 'documentation', noCache: true }
//       }
//     ]
//   },
//   { path: '*', redirect: '/404', hidden: true }
// ]

// const asyncRoutes = [
//   {
//     path: '/permission',
//     component: 'layout/Layout',
//     redirect: '/permission/page',
//     alwaysShow: true,
//     name: 'Permission',
//     meta: {
//       title: 'Permission',
//       icon: 'lock',
//       roles: ['admin', 'editor']
//     },
//     children: [
//       {
//         path: 'page',
//         component: '@/views/permission/page',
//         name: 'PagePermission',
//         meta: {
//           title: 'Page Permission',
//           roles: ['admin','editor']
//         }
//       },
//
//       {
//         path: 'role',
//         component: '@/views/permission/role',
//         name: 'RolePermission',
//         meta: {
//           title: 'Role Permission',
//           roles: ['admin']
//         }
//       }
//     ]
//   },
//   {
//     path: '/my-form',
//     component: 'layout/Layout',
//     children: [
//       {
//         path: 'index',
//         component: () => import('../../../src/views/spider/index'),
//         name: 'taskIndex',
//         // meta: { title: '我的表单', icon: 'icon', noCache: false }
//         meta: { title: '项目', icon: 'list', noCache: false }
//       }
//     ]
//   },
//
//   {
//     path: '/tinymce',
//     component: 'layout/Layout',
//     // redirect: 'noRedirect',
//     redirect: '/tinymce/index',
//     name: 'spider',
//     meta: {
//       title: '爬虫列表',
//       icon: 'bug',
//       // noCache: false
//     },
//     children: [
//       {
//         path: 'index',
//         component: () => import('@/views/spider/spiderList'),
//         name: 'spiderIndex',
//         meta: { title: '爬虫', icon: 'bug', noCache: false }
//       },
//       {
//         path: 'spiderTest',
//         component: () => import('@/views/spider/addConfig'),
//         name: '添加配置',
//         hidden: true,
//         // redirect: '/permission/page',
//         meta: { title: 'addConfig', noCache: true, icon: 'lock',roles: ['admin'] }
//       },
//       {
//         path: 'dynamicOperationTable',
//         component: () => import('@/views/spider/dynamicOperationTable'),
//         name: '动态操作表格',
//         hidden: true,
//         meta: { title: 'dynamicOperationTable', noCache: true, icon: 'lock' }
//       }
//     ]
//   },
//
//   {
//     path: '/sign',
//     component: 'layout/Layout',
//     children: [
//       {
//         path: 'index',
//         component: () => import('@/views/sign/index'),
//         name: 'sign',
//         meta: {title: '文档说明', icon: 'documentation', noCache: true}
//       }
//     ]
//   },
//
//
//
//
//
//
//
//
//
//
//   { path: '*', redirect: '/404', hidden: true }
// ]
const asyncRoutes = [
  {
    path: '/permission',
    component: 'layout/Layout',
    redirect: '/permission/index',
    alwaysShow: true,
    meta: {
      title: 'Permission',
      icon: 'lock',
      roles: ['admin', 'editor']
    },
    children: [
      {
        path: 'page',
        component: 'views/permission/page',
        name: 'PagePermission',
        meta: {
          title: 'Page Permission',
          roles: ['admin']
        }
      },
      {
        path: 'role',
        component: 'views/permission/role',
        name: 'RolePermission',
        meta: {
          title: 'Role Permission',
          roles: ['admin']
        }
      }
    ]
  },
  // {
  //   path: '/my-form',
  //   component: 'layout/Layout',
  //   children: [
  //     {
  //       path: 'index',
  //       component: 'views/spider/index',
  //       name: 'taskIndex',
  //       // meta: { title: '我的表单', icon: 'icon', noCache: false }
  //       meta: { title: '项目', icon: 'list', noCache: false }
  //     }
  //   ]
  // },
  {
    path: '/tinymce',
    component: 'layout/Layout',
    redirect: '/tinymce/spiderTest',
    name: 'spider',
    meta: {
      title: '爬虫',
      icon: 'bug',
    },
    children: [
      // {
      //   path: 'index',
      //   component: 'views/spider/spiderList',
      //   name: 'spiderIndex',
      //   meta: { title: '爬虫', icon: 'bug', noCache: false }
      // },
      {
        path: 'spiderTest',
        component: 'views/spider/addConfig',
        name: '添加配置',
        hidden: true,
        // redirect: '/permission/page',
        meta: { title: '爬虫配置', noCache: true, icon: 'lock',roles: ['admin'] }
      },
      {
        path: 'dynamicOperationTable',
        component: 'views/spider/dynamicOperationTable',
        name: '动态操作表格',
        hidden: true,
        meta: { title: 'dynamicOperationTable', noCache: true, icon: 'lock' }
      }
    ]
  },



  {
    path: '/sign',
    component: 'layout/Layout',
    redirect: '/sign/index',
    alwaysShow: true,
    name: '文档说明',
    meta: {
      title: 'Documentation',
      icon: 'documentation',
      roles: ['admin','editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'index',
        component: '@/views/sign/index',
        name: 'sign',
        meta: {   title: 'Introduction',
          roles: ['admin','editor']}
      },
      {
        path: 'instructions',
        component: '@/views/sign/instructions',
        name: 'sign',
        meta: { title: 'Instruction', roles: ['admin','editor'] }
      }
    ]
  },


  { path: '*', redirect: '/404', hidden: true }
]

module.exports = {
  constantRoutes,
  asyncRoutes
}

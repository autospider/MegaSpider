import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

/* Layout */
import Layout from '@/layout'

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    hidden: true,
    meta: {
      title: 'Permission',
      icon: 'lock',
      roles: ['admin','editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: 'Page Permission',
          roles: ['admin','editor'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role'),
        name: 'RolePermission',
        meta: {
          title: 'Role Permission',
          roles: ['admin']
        }
      }
    ]
  },
  {
    path: '/my-form',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/spider/index'),
        name: 'taskIndex',
        // meta: { title: '我的表单', icon: 'icon', noCache: false }
        meta: { title: '项目', icon: 'list', noCache: false }
      }
    ]
  },

  {
    path: '/tinymce',
    component: Layout,
    // redirect: 'noRedirect',
    redirect: '/tinymce/index',
    name: 'spider',
    meta: {
      title: '爬虫列表',
      icon: 'bug',
      // noCache: false
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/spider/spiderList'),
        name: 'spiderIndex',
        // meta: { title: '我的表单', icon: 'icon', noCache: false }
        meta: { title: '爬虫', icon: 'bug', noCache: false }
        // children: [
        //   {
        //     path: 'addConfig',
        //     component: () => import('/views/spider/addConfig'),
        //     name: 'addConfig',
        //     meta: { title: 'addConfig', noCache: true }
        //   }
        // ]
      },
      {
        path: 'spiderTest',
        component: () => import('@/views/spider/addConfig'),
        name: '添加配置',
        hidden: true,
        // redirect: '/permission/page',
        meta: { title: 'addConfig', noCache: true, icon: 'lock',roles: ['admin'] }
      },
      {
        path: 'dynamicOperationTable',
        component: () => import('@/views/spider/dynamicOperationTable'),
        name: '动态操作表格',
        hidden: true,
        meta: { title: 'dynamicOperationTable', noCache: true, icon: 'lock' }
      }
    ]
  },
  {
    path: '/timer',
    component: Layout,
    // redirect: 'noRedirect',
    redirect: '/timer/index',
    name: 'spider',
    hidden:true,
    meta: {
      title: '定时任务',
      icon: 'table',
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/spider/timer'),
        name: 'Timer',
        // meta: { title: '我的表单', icon: 'icon', noCache: false }
        meta: { title: '定时任务', icon: 'table', noCache: false }
        // children: [
        //   {
        //     path: 'addConfig',
        //     component: () => import('/views/spider/addConfig'),
        //     name: 'addConfig',
        //     meta: { title: 'addConfig', noCache: true }
        //   }
        // ]
      }
    ]
  }
  ,
  {
    path: '/database',
    component: Layout,
    // redirect: 'noRedirect',
    redirect: '/database/index',
    name: 'database',
    meta: {
      title: '数据连接管理',
      icon: 'tree',
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/spider/database'),
        name: 'dbConnection',
        // meta: { title: '我的表单', icon: 'icon', noCache: false }
        meta: { title: '数据库连接', icon: 'tree', noCache: false }
        // children: [
        //   {
        //     path: 'addConfig',
        //     component: () => import('/views/spider/addConfig'),
        //     name: 'addConfig',
        //     meta: { title: 'addConfig', noCache: true }
        //   }
        // ]
      }
    ]
  }
,
  {
    path: '/sign',
    component: Layout,
    // redirect: '/sign/index',
    redirect: '/sign/Instructions',
    // alwaysShow: true,
    name: '文档说明',
    meta: {
      title: '使用说明',
      icon: 'documentation',
      roles: ['admin','editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/sign/index'),
        name: 'sign',
        hidden: true,
        meta: {   title: 'Introduction',
          roles: ['admin','editor']}
      },
      {
        path: 'Instructions',
        component: () => import('@/views/sign/instructions'),
        name: 'sign',
        meta: { title: '使用说明', roles: ['admin','editor'] }
      }
    ]
  },

  // {
  //   path: '/addConfig',
  //   // component: Layout,
  //   component: () => import('@/views/spider/addConfig'),
  //   // redirect: '/material/upload',
  //   meta: {
  //     title: '添加爬虫'
  //     // icon: 'plane'
  //   }
  // },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new VueRouter({
  // mode: 'history', // require service support
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

import { createWebHistory, createRouter } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import ProductView from "@/views/ProductView.vue";
import CartView from "@/views/CartView.vue";
import PaymentView from "@/views/PaymentView.vue";
import TransactionView from "@/views/TransactionView.vue";
import TransactionDetail from "@/views/TransactionDetail.vue";
import RegisterView from "@/views/RegisterView.vue";
import LoginView from "@/views/LoginView.vue";
import DashboardAdmin from "@/views/admin/DashboardAdmin.vue";
import IndexUser from "@/views/admin/user/IndexUser.vue";
import IndexProduct from "@/views/admin/product/IndexProduct.vue";
import CreateProduct from "@/views/admin/product/CreateProduct.vue";
import DetailProduct from "@/views/admin/product/DetailProduct.vue";
import EditProduct from "@/views/admin/product/EditProduct.vue";
import IndexTransactions from "@/views/admin/transaction/IndexTransactions.vue";
import DetailTransaction from "@/views/admin/transaction/DetailTransaction.vue";
import ShippingTransaction from "@/views/admin/transaction/ShippingTransaction.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { role: "USER" },
  },
  {
    path: "/product/:id",
    name: "product",
    component: ProductView,
    meta: { role: "USER" },
  },
  {
    path: "/cart",
    name: "cart",
    component: CartView,
    meta: { requiresAuth: true, role: "USER" },
  },
  {
    path: "/payment/:id",
    name: "payment",
    component: PaymentView,
    meta: { requiresAuth: true, role: "USER" },
  },
  {
    path: "/transaction",
    name: "transaction",
    component: TransactionView,
    meta: { requiresAuth: true, role: "USER" },
  },
  {
    path: "/transaction/:id",
    name: "transaction.detail",
    component: TransactionDetail,
    meta: { requiresAuth: true, role: "USER" },
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: DashboardAdmin,
    meta: { requiresAuth: true, role: "ADMIN" },
  },
  {
    path: "/admin/users",
    name: "users",
    component: IndexUser,
    meta: { requiresAuth: true, role: "ADMIN" },
  },
  {
    path: "/admin/products",
    name: "products.index",
    component: IndexProduct,
    meta: { requiresAuth: true, role: "ADMIN" },
  },
  {
    path: "/admin/productsCreate",
    name: "products.create",
    component: CreateProduct,
    meta: { requiresAuth: true, role: "ADMIN" },
  },
  {
    path: "/admin/detailProduct/:id",
    name: "products.detail",
    component: DetailProduct,
    meta: { requiresAuth: true, role: "ADMIN" },
  },
  {
    path: "/admin/editProduct/:id",
    name: "products.edit",
    component: EditProduct,
    meta: { requiresAuth: true, role: "ADMIN" },
  },
  {
    path: "/admin/transactions",
    name: "transactions.index",
    component: IndexTransactions,
    meta: { requiresAuth: true, role: "ADMIN" },
  },
  {
    path: "/admin/transactions/:id",
    name: "transactions.detail",
    component: DetailTransaction,
    meta: { requiresAuth: true, role: "ADMIN" },
  },
  {
    path: "/admin/transactions/shipping/:id",
    name: "transactions.shipping",
    component: ShippingTransaction,
    meta: { requiresAuth: true, role: "ADMIN" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  linkExactActiveClass: "exact-active-link",
  routes,
});

router.beforeEach((to, from, next) => {
  let isLoggedIn = !!localStorage.getItem("token");
  let role = localStorage.getItem("role");

  if (to.meta.role) {
    if (to.meta.requiresAuth || isLoggedIn) {
      if (to.meta.role !== role) {
        if (role === "ADMIN") {
          router.push({ path: "/dashboard" });
        } else if (role === "USER") {
          router.push({ path: "/" });
        } else {
          router.push({ path: "/login" });
        }
      } else {
        next();
        return;
      }
    } else {
      next();
      return;
    }
  } else {
    next();
  }
});

export default router;

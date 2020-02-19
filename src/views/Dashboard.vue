<template>
  <div class="dashboard">
    <div class="dashboard-action">
      <h3>ADMIN</h3>
      <ul>
        <li>
          <router-link to="/dashboard/products">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-shopping-cart"
              data-darkreader-inline-fill
              data-darkreader-inline-stroke
              style="--darkreader-inline-fill:none; --darkreader-inline-stroke:currentColor;"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            Products
          </router-link>
        </li>
        <li>
          <router-link to="/dashboard/orders">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-file"
              data-darkreader-inline-fill
              data-darkreader-inline-stroke
              style="--darkreader-inline-fill:none; --darkreader-inline-stroke:currentColor;"
            >
              <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
              <polyline points="13 2 13 9 20 9" />
            </svg>Orders
          </router-link>
        </li>
        <li>
          <router-link to="/dashboard/coupons">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-layers"
              data-darkreader-inline-fill
              data-darkreader-inline-stroke
              style="--darkreader-inline-fill:none; --darkreader-inline-stroke:currentColor;"
            >
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>Coupons
          </router-link>
        </li>
      </ul>
    </div>
    <router-view class="dashboard-view"></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
</style>
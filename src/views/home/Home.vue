<template>
  <div>

  </div>
</template>

<script>

import request from "@/utils/request";
import Cookies from "js-cookie";
export default {
  name: "Home",
  data() {
    return {
      admin: Cookies.get('admin') ? JSON.parse(Cookies.get('admin')) : {}
    }
  },
  created() {
    request.get("/admin/"+this.admin.id).then(res => {
      this.admin = res.data
    })
  },
}

</script>

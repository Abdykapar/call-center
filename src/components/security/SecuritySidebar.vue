<template>
   <div id="wrapper">  
       <sidebar/>  
     <!-- Content Wrapper -->
    <div id="content-wrapper" class="d-flex flex-column">
        <!-- Main Content -->
      <div id="content">

        <navigation/> 
        <!-- Begin Page Content -->
        <div class="container-fluid">
            <!-- Page Heading -->
            <h1 class="h3 mb-2 text-gray-800">Лоты</h1>
           
            <div v-if="loading" class="loading">
                Loading...
            </div>
            <div v-if="error" class="error">
                {{ error }}
            </div>
            <!-- DataTales Example -->
            <div class="card shadow mb-4">
                <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-primary"></h6>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered table-striped" id="dataTable" width="100%" cellspacing="0">
                            <thead>
                            <tr>
                                
                                <th>Продукт</th>
                                <th>Количество</th>
                                <th>Цена</th>
                                <th>Дата поставки</th>
                    
                                <th>Действия</th>
                            </tr>
                            </thead>
                            <tbody>
                            
                            <tr v-for="lot in lots" :key="lot.id+'-label'">
                            
                                <td>{{lot.product_name}}</td>
                                <td>{{lot.filled+ ' / '+lot.quantity+ ' ' + lot.measure}}</td>
                                <td>{{lot.start_price}}</td>
                                <td>{{lot.shipment_date}}</td>
                                <td>
                                    <router-link :to="`/lot-detail/${lot.id}`" class="btn btn-info btn-circle"><i class="fas fa-info-circle"></i></router-link>
                                    <a href="#" class="btn btn-warning btn-circle">
                                        <i class="fas fa-archive"></i>
                                    </a>
                                    <a href="#" class="btn btn-danger btn-circle">
                                        <i class="fas fa-times"></i>
                                    </a>
                                </td>
                                
                            </tr>
                        
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
        </div>
        
        <!-- /.container-fluid -->
      </div>
        <router-link to="/location/country/create" class="btn btn-lg btn-success btn-circle" id="fixedbutton"><i class="fas fa-plus"></i></router-link>
    </div>
    
   </div>
</template>

<style scoped>
    #fixedbutton {
    position: fixed;
    bottom: 5%;
    right: 5%; 
}
</style>


<script>
import { lotService } from '../../_services/lot.service';
import Sidebar from '../sidebar'
import Navigation from '../navigation'
export default {
    name: "mylotlist",
    components: {
        Sidebar,
        Navigation, 
    },
    data() {
        return {
            loading: false,
            error: null,
            lots: null,
        };
    }, 
    watch: {
        // call again the method if the route changes
        '$route': 'fetchData'
    },
    methods: {
        fetchData () {
            
            lotService.getMyLotsByStatus(this.$route.params.status)
            .then(lots => {
                this.lots = lots;
                this.loading = false;
            })
            .catch((err) => {
                console.log(err)
                this.error = err
            })
        }
    },
    created() {
        this.fetchData();
    },
};
</script>
<template>
  <div>
    <sidebar />
    <div class="page-container">
      <!-- HEADER DESKTOP-->
      <header class="header-desktop">
        <div class="section__content section__content--p30">
          <div class="container-fluid">
            <div class="header-wrap">
              <form class="form-header" action method="POST">
                <input
                  class="au-input au-input--xl"
                  type="text"
                  name="search"
                  placeholder="Search for datas &amp; reports..."
                />
                <button class="au-btn--submit" type="submit">
                  <i class="zmdi zmdi-search"></i>
                </button>
              </form>
              <div class="header-button">
                <div class="noti-wrap">
                  <div class="noti__item js-item-menu">
                    <i class="zmdi zmdi-comment-more"></i>
                    <span class="quantity">1</span>
                    <div class="mess-dropdown js-dropdown">
                      <div class="mess__title">
                        <p>You have 2 news message</p>
                      </div>
                      <div class="mess__item">
                        <div class="image img-cir img-40">
                          <img src="/static/images/icon/avatar-06.jpg" alt="Michelle Moreno" />
                        </div>
                        <div class="content">
                          <h6>Michelle Moreno</h6>
                          <p>Have sent a photo</p>
                          <span class="time">3 min ago</span>
                        </div>
                      </div>
                      <div class="mess__item">
                        <div class="image img-cir img-40">
                          <img src="/static/images/icon/avatar-04.jpg" alt="Diane Myers" />
                        </div>
                        <div class="content">
                          <h6>Diane Myers</h6>
                          <p>You are now connected on message</p>
                          <span class="time">Yesterday</span>
                        </div>
                      </div>
                      <div class="mess__footer">
                        <a href="#">View all messages</a>
                      </div>
                    </div>
                  </div>
                  <div class="noti__item js-item-menu">
                    <i class="zmdi zmdi-email"></i>
                    <span class="quantity">1</span>
                    <div class="email-dropdown js-dropdown">
                      <div class="email__title">
                        <p>You have 3 New Emails</p>
                      </div>
                      <div class="email__item">
                        <div class="image img-cir img-40">
                          <img src="/static/images/icon/avatar-06.jpg" alt="Cynthia Harvey" />
                        </div>
                        <div class="content">
                          <p>Meeting about new dashboard...</p>
                          <span>Cynthia Harvey, 3 min ago</span>
                        </div>
                      </div>
                      <div class="email__item">
                        <div class="image img-cir img-40">
                          <img src="/static/images/icon/avatar-05.jpg" alt="Cynthia Harvey" />
                        </div>
                        <div class="content">
                          <p>Meeting about new dashboard...</p>
                          <span>Cynthia Harvey, Yesterday</span>
                        </div>
                      </div>
                      <div class="email__item">
                        <div class="image img-cir img-40">
                          <img src="/static/images/icon/avatar-04.jpg" alt="Cynthia Harvey" />
                        </div>
                        <div class="content">
                          <p>Meeting about new dashboard...</p>
                          <span>Cynthia Harvey, April 12,,2018</span>
                        </div>
                      </div>
                      <div class="email__footer">
                        <a href="#">See all emails</a>
                      </div>
                    </div>
                  </div>
                  <div class="noti__item js-item-menu">
                    <i class="zmdi zmdi-notifications"></i>
                    <span class="quantity">3</span>
                    <div class="notifi-dropdown js-dropdown">
                      <div class="notifi__title">
                        <p>You have 3 Notifications</p>
                      </div>
                      <div class="notifi__item">
                        <div class="bg-c1 img-cir img-40">
                          <i class="zmdi zmdi-email-open"></i>
                        </div>
                        <div class="content">
                          <p>You got a email notification</p>
                          <span class="date">April 12, 2018 06:50</span>
                        </div>
                      </div>
                      <div class="notifi__item">
                        <div class="bg-c2 img-cir img-40">
                          <i class="zmdi zmdi-account-box"></i>
                        </div>
                        <div class="content">
                          <p>Your account has been blocked</p>
                          <span class="date">April 12, 2018 06:50</span>
                        </div>
                      </div>
                      <div class="notifi__item">
                        <div class="bg-c3 img-cir img-40">
                          <i class="zmdi zmdi-file-text"></i>
                        </div>
                        <div class="content">
                          <p>You got a new file</p>
                          <span class="date">April 12, 2018 06:50</span>
                        </div>
                      </div>
                      <div class="notifi__footer">
                        <a href="#">All notifications</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="account-wrap">
                  <div class="account-item clearfix js-item-menu">
                    <div class="image">
                      <img src="/static/images/icon/avatar-01.jpg" alt="John Doe" />
                    </div>
                    <div class="content">
                      <a class="js-acc-btn" href="#">john doe</a>
                    </div>
                    <div class="account-dropdown js-dropdown">
                      <div class="info clearfix">
                        <div class="image">
                          <a href="#">
                            <img src="/static/images/icon/avatar-01.jpg" alt="John Doe" />
                          </a>
                        </div>
                        <div class="content">
                          <h5 class="name">
                            <a href="#">john doe</a>
                          </h5>
                          <span class="email">johndoe@example.com</span>
                        </div>
                      </div>
                      <div class="account-dropdown__body">
                        <div class="account-dropdown__item">
                          <a href="#">
                            <i class="zmdi zmdi-account"></i>Account
                          </a>
                        </div>
                        <div class="account-dropdown__item">
                          <a href="#">
                            <i class="zmdi zmdi-settings"></i>Setting
                          </a>
                        </div>
                        <div class="account-dropdown__item">
                          <a href="#">
                            <i class="zmdi zmdi-money-box"></i>Billing
                          </a>
                        </div>
                      </div>
                      <div class="account-dropdown__footer">
                        <a href="#">
                          <i class="zmdi zmdi-power"></i>Logout
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <!-- HEADER DESKTOP-->
      <!-- MAIN CONTENT-->
      <div class="main-content">
        <div class="section__content section__content--p30">
          <div class="container-fluid">
           
            <div class="row">
                <div class="col-md-12">
                    <!-- DATA TABLE -->
                    <h3 class="title-5 m-b-35">data table</h3>
                    <div class="table-data__tool">
                 
                        <div class="table-data__tool-right">
                            <router-link class="au-btn au-btn-icon au-btn--green au-btn--small" to="country/create">  <i class="zmdi zmdi-plus"></i>add country</router-link>
                          
                        </div>
                    </div>
                    <div class="table-responsive table-responsive-data2">
                        <table class="table table-data2">
                            <thead>
                                <tr>
                                    <th>name</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                               
                                <tr v-for="country in countries" :key="country.id" class="tr-shadow">
                                  
                                    <td>{{ country.title }}</td>
                                   
                                    <td>
                                        <div class="table-data-feature">
                                            <router-link :to="{ name: 'countryEdit', params: { id: country.id }}" class="item"><i class="zmdi zmdi-edit"></i></router-link>
                                         
                                            <button class="item" data-toggle="tooltip" data-placement="top" title="Delete" @click.prevent="deleteCountry(country.id)">
                                                <i class="zmdi zmdi-delete"></i>
                                            </button>
                                            
                                        </div>
                                    </td>
                                </tr>
                                <tr class="spacer"></tr>
                                
                            </tbody>
                        </table>
                    </div>
                    <!-- END DATA TABLE -->
                </div>
            </div>
             
          </div>
        </div>
      </div>
      <!-- END MAIN CONTENT-->
      <!-- END PAGE CONTAINER-->
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { countryService } from "../../../_services/location/country.service";
import Sidebar from "../../navigations/sidebar/Sidebar";

export default {
  name: "country",
  components: {
    Sidebar
  },
  data() {
    return {
      loading: false,
      error: null,
      countries: null
    };
  },
  watch: {
    // call again the method if the route changes
    $route: "fetchData"
  },
  methods: {
    deleteCountry(id)
    {
        countryService.delete(id)
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                console.log(err);
            });
    },
    fetchData() {
      countryService
        .getAll(this.$route.params.status)
        .then(result => {
          this.countries = result.content;
          console.log(result);
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
          this.error = err;
        });
    }
  },
  created() {
    this.fetchData();
  }
};
</script>
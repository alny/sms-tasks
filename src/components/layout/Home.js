import React, { Component } from 'react'
import { Tasks, Categories, Account } from '../containers'

class Home extends Component {
  render(){
    return(

      <div id="wrapper">

          <div id="main">
            <div className="inner">

                <header id="header">
                  <a href="index.html" className="logo"><strong>Tasks </strong>List</a>
                  <ul className="icons">
                    <li><a href="#" className="icon fa-twitter"><span className="label">Twitter</span></a></li>
                    <li><a href="#" className="icon fa-facebook"><span className="label">Facebook</span></a></li>
                    <li><a href="#" className="icon fa-snapchat-ghost"><span className="label">Snapchat</span></a></li>
                    <li><a href="#" className="icon fa-instagram"><span className="label">Instagram</span></a></li>
                    <li><a href="#" className="icon fa-medium"><span className="label">Medium</span></a></li>
                  </ul>
                </header>

                <section id="banner">

                        <Tasks/>

                  <div className="content">
                      <article>
                        <div className="content">
                          <Account/>
                        </div>
                      </article>

                  </div>


                </section>

            </div>
          </div>


          <div id="sidebar">

            <Categories/>


          </div>

      </div>

        // <div className="row">
        //
        //
        //   <div className="col-md-2">
        //
        //       <Categories/>
        //
        //   </div>
        //
        //   <div className="col-md-8">
        //
        //       <Tasks/>
        //
        //   </div>
        //
        //   <div className="col-md-2">
        //
        //       <Account/>
        //
        //   </div>
        //
        //
        // </div>

    )
  }
}

export default Home

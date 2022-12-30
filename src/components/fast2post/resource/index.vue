<template>
	<div class="container-fluid m-t-30">
		<div class="row">

            <div class="col-lg-2">
                <div>
                    <a href="#get-started">Get Started</a>
                </div>
                <div>
                    <a href="#api-guidelines">Document and API Usage Guidelines</a>
                  <!--  <vue-tree-list
                        @click="onClick"
                        :model="data"
                        v-bind:default-expanded="false"
                    >
                    <span class="icon" slot="treeNodeIcon">📂</span>
                    <span class="icon" slot="leafNodeIcon"><lable class="lable-post">POST</lable></span>
                    </vue-tree-list> -->
                </div>
                <div>
                    <a href="#error-code">Errors and Response codes</a>
                 </div>
                <div>
                    <a href="#authentication-api">Authentication API</a>
                 </div>
                <div>
                    <a href="#login-authentication-api">Login API</a>
                </div>
                 <div>
                    <a href="#all-order-api">Get All Orders</a>
                </div>
                <div>
                    <a href="#create-update-order-api">Create or Update Order API</a>
                </div>
                <div>
                    <a href="#assign-courier-api">Assign Courier API</a>
                </div>
            </div>


			<div class="col-lg-10">
                <div class="table-responsive table--no-card">
                    <table class="table table-borderless">
                        <tbody class="api-resource-tbody">

                            <tr id="get-started">
                                <td>
                                   <h3>Get Started</h3>
                                   <p>Here to register with fast2post and create an account for sign up process.</p>
                                   <p>After the sign up process is completed, following below listed steps to create an API user and get started with using our APIs:</p>
                                   <ol>
                                        <li>Open your fast2post account and move to the left hand panel.</li>
                                        <li>Click On <strong>API => Generate API User.</strong></li>
                                        <li>On the pop up menu, fill in the <strong>email</strong> (this should be different from the one used to register to fast2post).</li>
                                        <li>Fill in an appropriate password and confirm the password.</li>
                                        <li>Click on 'Generate API Credential'. On successful completion, you should have a new API user generated.</li>
                                        <li>The next step will be to use the Authentication API to obtain an authentication token. Copy this token and use it to authenticate your further API calls.</li>
                                    </ol> 
                                </td>
                            </tr>

                            <tr id="api-guidelines">
                                <td>
                                   <h3>Document and API Usage Guidelines</h3>
                                   <ul>
                                        <li>Our API's use the basic HTTP request codes: POST, GET, PATCH, & PUT.</li>
                                        <li>You can select the required response and request code language by selecting it from the drop down menu on the top.</li>
                                        <li>You can test all our APIs by importing the full API collection through the 'Run in Postman' button, and running them in the Postman app.</li>
                                        <li>Note: Any requests made using the valid API credentials will affect the real time data in your fast2post account.</li>
                                        <li>Please note that in order to use the generated token in your own code, you will need to pass the token in the following format in the appropriate header of your code :
                                        <br/><code class=" is-highlighted language-undefined">      Authorization: Bearer &lt;YOUR_TOKEN&gt;</code>
                                        </li>
                                        <li>The next step will be to use the Authentication API to obtain an authentication token. Copy this token and use it to authenticate your further API calls.</li>
                                    </ul> 
                                </td>
                            </tr>

                            <tr>
                                <td id="error-code">
                                   <h3>Errors and Response codes</h3>
                                   <p>While using fast2post's APIs, you may run into some standard response and error codes. The most common ones are listed along with their descriptions as follows:</p>
                                   <table class="table table-bordered table-dark-error">
                                        <tr>
                                            <th>Response Code</th>
                                            <th>Descriptions</th>
                                        </tr>
                                        <tr>
                                            <td><code>200</code> & <code>202</code> - <strong> OK </strong>&<strong> Accepted </strong></td>
                                            <td>Everything worked as expected. The response is displayed or the processing starts. Some API's may respond with an error message if data is invalid.</td>
                                        </tr>
                                        <tr>
                                            <td><code>400</code> <strong> Bad Request </strong></td>
                                            <td>The request was unacceptable, often due to missing a required parameter.</td>
                                        </tr>
                                        <tr>
                                            <td><code>401</code> <strong> Unauthorized </strong></td>
                                            <td>There is some error in validation. You need to check your token or credentials.</td>
                                        </tr>
                                         <tr>
                                            <td><code>404</code> <strong> Not Found </strong></td>
                                            <td>The URL is inaccessible. This is either due to the wrong URL input or the resource being depriciated.</td>
                                        </tr>
                                        <tr>
                                            <td><code>405</code> <strong> Method Not Allowed </strong></td>
                                            <td>The API was accessed using a wrong method. Check your HTTP method.</td>
                                        </tr>
                                        <tr>
                                            <td><code>422</code> <strong> Unprocessable Entity</strong></td>
                                            <td>It means the request contains incorrect syntax or cannot be fulfilled. Try checking your code for errors.</td>
                                        </tr>
                                        <tr>
                                            <td><code>429</code> <strong> Too Many Requests</strong></td>
                                            <td>Too many hits were attempted at the API too quickly. Provide the API some time to process.</td>
                                        </tr>
                                        <tr>
                                            <td><code>500</code>, <code>502</code>, <code>503</code>, <code>504</code>,<strong> Server Errors</strong></td>
                                            <td>Some server error occurred. Some APIs may show this due to syntax or parameter errors. Try contacting support if this persists.</td>
                                        </tr>
                                   </table>
                                </td>
                                <td>
                                </td>
                            </tr>

                            <tr id="authentication-api">
                                <td>
                                    <h3>Authentication API</h3>
                                    <p>The authentication token is the authorization that you need to pass in order to access fast2post's resources. This authorization helps us to validate that you are a valid fast2post user. fast2post APi uses JWT tokens for validation.</p>
                                    <br/>
                                    <p>Use this API to validate your API user and obtain the authentication token. Copy this token and use it for the further call of the API's.</p>
                                    <br/>
                                    <p>Your API keys carry many privileges, so be sure to keep them secure! Do not share your secret token in publicly accessible areas such as GitHub, client-side code, and so forth.</p>
                                    <br/>
                                    <strong>Steps To Use Token:</strong>
                                    <ol>
                                        <li>Copy the token recieved in response.</li>
                                        <li>Include 'Authorization: Bearer [yourtokenvalue]' in the appropriate field of your code.</li>
                                        <li>Thats all! In case of any error, try checking your parameters.</li>
                                    </ol>
                                </td>
                            </tr>  

                            

                            <tr id="login-authentication-api">
                                <td>
                                    <div id="accordion">
                                        <div class="card">	
                                            <div class="card-header" id="headingOne">
                                            <h5 class="mb-0">
                                                <button class="btn btn-link" data-toggle="collapse" data-target="#collapseLogin" aria-expanded="true" aria-controls="collapseOne">
                                                 <h4><lable class="lable-post">POST</lable>  http://textbulksms.co.in/public/api/login</h4>			  
                                                </button>
                                            </h5>
                                            </div>
                                            <div id="collapseLogin" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                                            <div class="card-body">			
                                               <pre>

    POST /public/api/login HTTP/1.1
    Host: http://textbulksms.co.in
    Content-Type: application/json

    {
        "email": "",
        "password": ""
    }
                                        </pre>
                                            </div>
                                            </div>
                                        </div>
                                    </div>                                 
                                </td>
                            </tr>
                            
                            <tr id="all-order-api">
                                <td>
                                    <h3>Get All Orders</h3>
                                    <p>
                                        This API call will display a list of all created and available orders in your fast2post account. The product and shipment details are displayed as sub-arrays within each order detail.
                                    </p>
                                    <p>
                                        You can also sort and filter the data according to your needs by passing the optional parameters. Not passing anything will display the data in the default format.
                                    </p>
                                    <br/>
                                    <div id="accordion">
                                        <div class="card">	
                                            <div class="card-header" id="headingAllOrders">
                                            <h5 class="mb-0">
                                                <button class="btn btn-link" data-toggle="collapse" data-target="#collapseAllOrders" aria-expanded="true" aria-controls="collapseOne">
                                                    <h4><lable class="lable-get">GET</lable>  http://textbulksms.co.in/public/api/orders</h4>	  
                                                </button>
                                            </h5>
                                            </div>
                                            <div id="collapseAllOrders" class="collapse show" aria-labelledby="headingAllOrders" data-parent="#accordion">
                                            <div class="card-body">			
                                                <pre>

    POST /public/api/orders?search=&start_date=06-06-2020&end_date=21-06-2020 HTTP/1.1
    Host: http://textbulksms.co.in
    Content-Type: application/json

    {
    "data": [
            {
                "id": 2,
                "client_id": 1,
                "courier_id": 1,
                "pickup_by_id": null,
                "deliver_by_id": null,
                "barcode_number": "BRB123456789",
                "reference_number": "REFF2P123456789",
                "order_number": "123",
                "order_url": "http://example.com/order/123",
                "order_date": "2020-06-06 12:00:00",
                "customer_name": "Mr. ABC",
                "email": "abc@example.com",
                "contact_number1": "9876543210",
                "contact_number2": null,
                "address1": "Demo street",
                "address2": "near demo circle",
                "address3": "opp. demo school",
                "pincode": "395005",
                "city": "Surat",
                "state": "Gujarat",
                "country": "India",
                "order_status": "Created",
                "payment_status": "pending",
                "payment_mode": "cod",
                "total_weight": "10.00",
                "total_charge_amount": "50.00",
                "width": null,
                "height": null,
                "length": null,
                "created_by": 1,
                "updated_by": 1,
                "created_at": "2020-06-06 03:35:22",
                "updated_at": "2020-06-13 08:12:32",
                "deleted_at": null
            },
            {
                "id": 4,
                "client_id": 1,
                "courier_id": null,
                "pickup_by_id": null,
                "deliver_by_id": null,
                "barcode_number": "BRB987654321",
                "reference_number": "REFF2P987654321",
                "order_number": "1234564",
                "order_url": "http://example.com/order/123",
                "order_date": "2020-06-13 12:00:00",
                "customer_name": "Mr. ABC564",
                "email": "abc564@example.com",
                "contact_number1": "9876543210",
                "contact_number2": null,
                "address1": "Demo street",
                "address2": null,
                "address3": null,
                "pincode": "395005",
                "city": "Surat",
                "state": "Gujarat",
                "country": "India",
                "order_status": "Created",
                "payment_status": "pending",
                "payment_mode": "online",
                "total_weight": "50.00",
                "total_charge_amount": null,
                "width": null,
                "height": null,
                "length": null,
                "created_by": 1,
                "updated_by": 1,
                "created_at": "2020-06-13 08:29:32",
                "updated_at": "2020-06-13 08:29:32",
                "deleted_at": null
            },
            {
                "id": 5,
                "client_id": 1,
                "courier_id": 1,
                "pickup_by_id": null,
                "deliver_by_id": null,
                "barcode_number": "BRB123456880",
                "reference_number": "REFF2P123456880",
                "order_number": "101",
                "order_url": "https://fontawesome.com/icons?d=gallery&q=setting",
                "order_date": "2020-06-20 12:00:00",
                "customer_name": "Pradip Mistry",
                "email": "pradip.mistry89@gmail.com",
                "contact_number1": "0123456789",
                "contact_number2": "0123456789",
                "address1": "test",
                "address2": "test",
                "address3": "test",
                "pincode": "396445",
                "city": "Navsari",
                "state": "Gujarat",
                "country": "India",
                "order_status": "Created",
                "payment_status": "pending",
                "payment_mode": "cod",
                "total_weight": "10.00",
                "total_charge_amount": "50.00",
                "width": null,
                "height": null,
                "length": null,
                "created_by": 1,
                "updated_by": 1,
                "created_at": "2020-06-14 05:54:58",
                "updated_at": "2020-06-14 06:42:34",
                "deleted_at": null
            }
        ],
        "total_record": 3
    }
                                        </pre>
                                            </div>
                                            </div>
                                        </div>
                                    </div>                                 
                                </td>
                            </tr>
                            <tr id="create-update-order-api">
                                <td>
                                    <h3>Create or Update Order API</h3>
                                    <p>These API's create new orders or update details about already existing orders.
                                        You can also cancel an order also add inventory for an ordered product.</p>
                                    <br/>
                                </td>
                            </tr>  

                            <tr id="create-order-api">
                                <td>
                                   
                                    <br/>
                                    <ul>
                                    <li> <p>Use this API to create a quick custom order. Quick orders are the ones where we do not store the product details in the master catalog.
You have to pass all the required params at the minimum to create a quick custom order. Further parameters can be added as required.</p></li>
                                    <li><p>
                                        You have to pass all the required params at the minimum to create a quick custom order. Further parameters can be added as required.
                                    </p></li>

                                    <li>
                                        <p>
                                            order_id Field cannot be equal to an already existing id. Doing so does not change or affect the existing order.
                                        </p>
                                    </li>
                                    <li>
                                        <p>
                                            Be sure to input the correct calculated sub_total amount. This is not calculated automatically through the API.
                                        </p>
                                    </li>
                                     <li>
                                        <p>
                                            The order id returned in the response is the fast2post order id. This should be noted as it will be used in further API calls.
                                        </p>
                                    </li>
                                    </ul>
                                   <br/>
                                    <div id="accordion">
                                        <div class="card">	
                                            <div class="card-header" id="headingCreateUpdateOrder">
                                            <h5 class="mb-0">
                                                <button class="btn btn-link" data-toggle="collapse" data-target="#collapseCreateUpdateOrder" aria-expanded="true" aria-controls="collapseOne">
                                                <h4><lable class="lable-post">POST</lable>http://textbulksms.co.in/public/api/orders/create </h4>		  
                                                </button>
                                            </h5>
                                            </div>
                                            <div id="collapseCreateUpdateOrder" class="collapse show" aria-labelledby="headingCreateUpdateOrder" data-parent="#accordion">
                                            <div class="card-body">			
                                                <pre>

    POST /public/api/orders/create HTTP/1.1
    Host: http://textbulksms.co.in
    Content-Type: application/json
    Authorization: Bearer [token]

    order: {
        id: 256398,
        courier_id: 1,
        barcode_number: "BRB123456880",
        reference_number: "BRB123456881",
        order_number: 65986,
        order_url: null,
        order_date: 2020-02-26 10:10,
        payment_mode: COD,
        total_weight: 50,
        total_charge_amount: 260,
        customer_name: mr.xyz len,
        email: xyz123@mail.com,
        contact_number1: xxx-xxx-xxxx,
        contact_number2: xxx-xxx-xxxx,
        address1: House-123, Large ville,New city.,
        address2: House-123, Large ville,New city.,
        address3: House-123, Large ville,New city.,
        country: India,
        state: Maharastra,
        pincode: 569324,
        city: Mumbai,
        order_status: "InProgress",
        payment_status: "pending",
        width:68,
        height:46,
        length:55,
        order_items:[
            order_item:{
                id:123,
                order_id:256398,
                sku:prod101,
                quantity:10
            }
        ]
    }
		
                                        </pre>
                                            </div>
                                            </div>
                                        </div>
                                    </div>    
                                </td>
                            </tr>

                            <tr id="assign-courier-api">
                                <td>
                                    <h3>Assign Courier</h3>
                                    <p>Using this API, you can assign courier to order. it's fetch multiple courier option related to weight or price. After that assign courier you can change order status for processing.</p>
                                    <br/>
                                    <div id="accordion">
                                        <div class="card">
                                            <div class="card-header" id="headingOne">
                                            <h5 class="mb-0" data-toggle="collapse" data-target="#collapseAssignCourier" aria-expanded="true" aria-controls="collapseOne">
                                                <button class="btn btn-link" >
                                                 <h4><lable class="lable-post">POST</lable> http://textbulksms.co.in/public/api/orders-assign-courier/2</h4>
                                                </button>
                                            </h5>
                                            </div>

                                            <div id="collapseAssignCourier" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                                            <div class="card-body">
                                                <pre>

    POST /public/api/orders-assign-courier/2 HTTP/1.1
    Host: http://textbulksms.co.in
    Content-Type: application/json

    {
        "courier_id": "1",
        "courier_charges": "50.00"
    }
                                        </pre>
                                            </div>
                                            </div>
                                        </div>
                                    </div>  
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>
			</div>
		</div>
	</div>
</template>
<script src="./index.js" />
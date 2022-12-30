<template>
	<div class="">
		<div class="row">
			<div class="col-lg-12">
				<div class="card">
					<div class="card-header">
                        <strong
                            >{{ courier.id == 0 ? "Add " : "" }}Courier{{
                                courier.id > 0 ? " - " + courier.name : ""
                                }}</strong
                        >	
                        <div class="back-btn">
                            <router-link
                                :to="backUrl"
                                class="btn btn-outline-primary btn-sm"
                            >
                                <i class="fa fa-arrow-left"></i> Back
                            </router-link>
                        </div>										
					</div>
					<ValidationObserver ref="observer" v-slot="{ handleSubmit }">
                        <form @submit.prevent="handleSubmit(validateCourier)">
                            <div class="card-body card-block">                            
                                <div class="row">
                                    <div class="col-md-6"> 
                                        <div class="form-group">
                                            <validation-provider name="Courier Name" rules="required" v-slot="{ errors }">
                                                <label
                                                    for="couriername"
                                                    class=" form-control-label"
                                                    >Courier Name</label
                                                ><span class="text-danger">*</span>
                                                <input
                                                    type="text"
                                                    id="couriername"
                                                    name="couriername"
                                                    v-model="courier.name"
                                                    placeholder="Enter Courier Name..."
                                                    class="au-input au-input--full form-control"
                                                />
                                                <span class="invalid-feedback">{{
                                                            errors[0]
                                                        }}</span>
                                            </validation-provider>
                                        </div>		
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <validation-provider name="Email" rules="required|email" v-slot="{ errors }">
                                                    <label
                                                        for="email"
                                                        class=" form-control-label"
                                                        >Email</label
                                                    ><span class="text-danger">*</span>
                                                    <input
                                                        type="text"
                                                        id="email"
                                                        name="email"
                                                        v-model="courier.email"
                                                        placeholder="Enter Email..."
                                                        class="au-input au-input--full form-control"
                                                    />
                                                    <span class="invalid-feedback">{{errors[0]}}</span>
                                            </validation-provider>
                                        </div>
                                    </div>                                    
                                </div> 

                                <div class="row">
                                    <div class="col-md-6"> 
                                        <div class="form-group">
                                            <validation-provider name="Contact Person" rules="required" v-slot="{ errors }">
                                                <label
                                                    for="contact_no"
                                                    class=" form-control-label"
                                                    >Contact Person</label
                                                ><span class="text-danger">*</span>
                                                <input
                                                    type="text"
                                                    id="contact_person"
                                                    name="contact_person"
                                                    v-model="courier.contact_person"
                                                    placeholder="Enter Contact Person..."
                                                    class="au-input au-input--full form-control"
                                                />
                                                <span class="invalid-feedback">{{
                                                            errors[0]
                                                        }}</span>
                                            </validation-provider>
                                        </div>		
                                    </div>
                                    <div class="col-md-6"> 
                                        <div class="form-group">
                                            <validation-provider name="Other Contact" rules="required" v-slot="{ errors }">
                                                <label
                                                    for="other_contact"
                                                    class=" form-control-label"
                                                    >Other Contact</label
                                                ><span class="text-danger">*</span>
                                                <input
                                                    type="text"
                                                    id="other_contact"
                                                    name="other_contact"
                                                    v-model="courier.other_contact"
                                                    placeholder="Enter Other Contact"
                                                    class="au-input au-input--full form-control"
                                                />
                                                <span class="invalid-feedback">{{
                                                            errors[0]
                                                        }}</span>
                                            </validation-provider>
                                        </div>		
                                    </div>
                                </div> 

                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                         <validation-provider name="Address" rules="required" v-slot="{ errors }">                                
                                                <label
                                                    for="address"
                                                    class=" form-control-label"
                                                    >Address</label
                                                ><span class="text-danger">*</span>
                                                <textarea
                                                    id="address"
                                                    name="address"
                                                    v-model="courier.address"
                                                    placeholder="Enter Address..."
                                                    class="au-input au-input--full form-control"
                                                    rows="4"
                                                ></textarea>
                                                <span class="invalid-feedback">{{errors[0]}}</span>
                                            </validation-provider>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                        <validation-provider name="Country" rules="required" v-slot="{ errors }">
                                                <label
                                                    for="country"
                                                    class=" form-control-label"
                                                    >Country</label><span class="text-danger">*</span>

                                                <input
                                                    type="text"
                                                    id="country"
                                                    name="country"
                                                    v-model="courier.country"
                                                    placeholder="Enter State Name..."
                                                    class="au-input au-input--full form-control"
                                                />
                                                <span class="invalid-feedback">{{errors[0]}}</span>
                                            </validation-provider>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                         <validation-provider name="State" rules="required" v-slot="{ errors }">
                                                <label
                                                    for="state"
                                                    class=" form-control-label"
                                                    >State</label><span class="text-danger">*</span>

                                                 <input
                                                    type="text"
                                                    id="state"
                                                    name="state"
                                                    v-model="courier.state"
                                                    placeholder="Enter State Name..."
                                                    class="au-input au-input--full form-control"
                                                />
                                                <span class="invalid-feedback">{{errors[0]}}</span>
                                            </validation-provider>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                <div class="col-md-6">
                                        <div class="form-group">
                                        <validation-provider name="City" rules="required" v-slot="{ errors }">
                                                <label
                                                    for="city"
                                                    class=" form-control-label"
                                                    >City</label><span class="text-danger">*</span>

                                                <input
                                                    type="text"
                                                    id="city"
                                                    name="city"
                                                    v-model="courier.city"
                                                    placeholder="Enter City Name..."
                                                    class="au-input au-input--full form-control"
                                                />
                                                <span class="invalid-feedback">{{errors[0]}}</span>
                                            </validation-provider>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                         <validation-provider name="Pincode" rules="required|numeric|min:6" v-slot="{ errors }">                                
                                                <label
                                                    for="pincode"
                                                    class=" form-control-label"
                                                    >Pincode</label
                                                ><span class="text-danger">*</span>
                                                <input
                                                    type="text"
                                                    id="pincode"
                                                    name="pincode"
                                                    v-model="courier.pincode"
                                                    placeholder="Enter Pincode..."
                                                    class="au-input au-input--full form-control"
                                                />
                                                <span class="invalid-feedback">{{errors[0]}}</span>
                                            </validation-provider>
                                        </div>
                                    </div>
                                     <div class="col-md-12">
                                        <div class="form-group">     
                                                                   
                                                <label
                                                    for="pan_number"
                                                    class=" form-control-label"
                                                    >Pan Number</label
                                                >
                                                <input
                                                    type="text"
                                                    id="pan_number"
                                                    name="pan_number"
                                                    v-model="courier.pan_number"
                                                    placeholder="Enter Pan Number..."
                                                    class="au-input au-input--full form-control"
                                                />
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">       
                                            <validation-provider 
                                                name="Customer Details" 
                                                rules="required" 
                                                v-slot="{ errors }"
                                                >                                 
                                                <label
                                                    for="customer_details"
                                                    class=" form-control-label"
                                                    >Customer Details</label
                                                ><span class="text-danger">*</span>
                                                <input
                                                    type="text"
                                                    id="customer_details"
                                                    name="customer_details"
                                                    v-model="courier.customer_details"
                                                    placeholder="Enter customer details..."
                                                    class="au-input au-input--full form-control"
                                                />
                                                <span class="invalid-feedback">{{errors[0]}}</span>
                                            </validation-provider>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">                                
                                                <label
                                                    for="gst_number"
                                                    class=" form-control-label"
                                                    >GST Number</label
                                                >
                                                <input
                                                    type="text"
                                                    id="gst_number"
                                                    name="gst_number"
                                                    v-model="courier.gst_number"
                                                    placeholder="Enter GST Number"
                                                    class="au-input au-input--full form-control"
                                                />
                                        </div>
                                    </div>
                                     <div class="col-md-6">
                                        <div class="form-group">    
                                            <validation-provider 
                                                name="IP Address" 
                                                rules="required"
                                                v-slot="{ errors }"
                                                >                                   
                                                <label
                                                    for="ip_address"
                                                    class=" form-control-label"
                                                    >IP Address</label
                                                ><span class="text-danger">*</span>
                                                <input
                                                    type="text"
                                                    id="ip_address"
                                                    name="ip_address"
                                                    v-model="courier.ip_address"
                                                    placeholder="Enter IP Address..."
                                                    class="au-input au-input--full form-control"
                                                />
                                             <span class="invalid-feedback">{{
                                                            errors[0]
                                                        }}</span>
                                            </validation-provider>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">      
                                            <validation-provider 
                                                name="Return Charges" 
                                                rules="required|numeric"
                                                v-slot="{ errors }"
                                                >                                   
                                                <label
                                                    for="return_charges"
                                                    class=" form-control-label"
                                                    >Return Charges</label
                                                ><span class="text-danger">*</span>
                                                <input
                                                    type="text"
                                                    id="return_charges"
                                                    name="return_charges"
                                                    v-model="courier.return_charges"
                                                    placeholder="Enter return charges..."
                                                    class="au-input au-input--full form-control"
                                                />
                                                <span class="invalid-feedback">{{
                                                            errors[0]
                                                        }}</span>
                                            </validation-provider>     
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">    
                                            <validation-provider name="Cancellation Charges" rules="required|numeric" v-slot="{ errors }">                                    
                                                <label
                                                    for="cancellation_charges"
                                                    class=" form-control-label"
                                                    >Cancellation Charges</label
                                                ><span class="text-danger">*</span>
                                                <input
                                                    type="text"
                                                    id="cancellation_charges"
                                                    name="cancellation_charges"
                                                    v-model="courier.cancellation_charges"
                                                    placeholder="Enter cancellation charges..."
                                                    class="au-input au-input--full form-control"
                                                />
                                                <span class="invalid-feedback">{{
                                                            errors[0]
                                                        }}</span>
                                            </validation-provider>
                                        </div>
                                    </div>
                                </div> 

                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <validation-provider 
                                                name="Website Url" 
                                                :rules="{ regex: /^(http:\/\/|https:\/\/)?[a-z0-9]+([\-.]{1}[a-z0-9]+)*\.[a-z]{2,}(:[0-9]{1,5})?(\/.*)?$/ }"
                                                v-slot="{ errors }"
                                                >                                        
                                                <label
                                                    for="website_url"
                                                    class=" form-control-label"
                                                    >Website Url</label
                                                >
                                                <input
                                                    type="text"
                                                    id="website_url"
                                                    name="website_url"
                                                    v-model="courier.website_url"
                                                    placeholder="Enter Website Url..."
                                                    class="au-input au-input--full form-control"
                                                />
                                                    <span class="invalid-feedback">{{
                                                            errors[0]
                                                        }}</span>
                                            </validation-provider>
                                        </div>
                                    </div>
                                </div>                       					
                            </div>
                            <div class="card-footer text-right">
                                <button type="submit" class="btn btn-outline-primary btn-sm">
                                    <i class="fas fa-save"></i>&nbsp; Save
                                </button>&nbsp;&nbsp;
                                <button v-if="courier.id === 0" type="button" class="btn btn-outline-danger btn-sm" @click="resetForm">
                                    <i class="fas fa-sync-alt"></i> Reset
                                </button>
                            </div>
                        </form>
					</ValidationObserver>
				</div>
			</div>
		</div>
	</div>
</template>
<script src="./index.js"></script>
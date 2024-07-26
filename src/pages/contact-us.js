export default function ContactUs() {
  return (   
                <div>
                    
                  <div>

                    <h1   className= " font-bold text-orange-400 font-sans text-center text-5xl  mt-32">
                      Contact us
                    </h1>
                    <p  className="  text-center m-8" > 
                      Our team is here for you online 24/7. Talk to us about order logistics, outfit inspiration or anything else 
                    </p>

                  </div>
                  

                        <div className="bg-[#eee]  rounded-3xl p-0 w-fit my-30 mx-auto flex justify-center my-7  md:w-50% sm:w-25% " >
                                  
                                    <div  className="my-40 mx-40 p-15 w-1/2 border-8 border-orange-400 rounded-2xl m-10 p-14 " style={{margin: " 20px 20px"  }}> 

                                      <img class="cu-icon" src="https://www.madewell.com/brand_creative/svg/contact-email.svg" alt="Email"/>
                                      <strong>EMAIL</strong>
                                        <p>Send us an email any time, any where.</p>
                                        <br/>
                                        <br/>
                                        <br/>
                                        <br/>
                                        <strong> 
                                          <button className="bg-orange-400  hover:bg-orange-500 rounded-xl p-5  " onClick={()=>{alert(`Enter your Email ${<form>
                                            <input type="email"/>
                                          </form>}`)}} >Email US</button> 
                                        </strong>
                                    </div>


                                    <div  className="my-40 mx-40 p-15 w-1/2 border-8 border-orange-400 rounded-2xl m-10 p-14" style={{margin: " 20px 20px"  }}> 

                                      <img class="cu-icon" src="https://www.madewell.com/brand_creative/svg/contact-phone.svg" alt="Phone"/>
                                      <strong>PHONE</strong>  
                                      <p>7am–11:59pm ET, seven days a week at <a href="tel:8665441937">866 544 1937</a></p>   
                                      <strong>INTERNATIONAL:</strong>
                                      <p>Send us an number any time, any where.</p>
                                      <br/>
                                      <strong> 
                                        <button className="bg-orange-400   hover:bg-orange-500  rounded-xl p-5 " >Phone US</button> 
                                      </strong>
                                      </div>

                                    </div>

                </div>
      )    
}

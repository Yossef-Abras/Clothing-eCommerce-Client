export default function VerifyEmail () {
return (
   <div className="border-5 border-orange-400 rounded-2xl w-auto">
       <div>
        <h1 className=" font-bold text-orange-400 font-sans text-center text-5xl  mt-20">
          Verify Email
        </h1>
        <p className= "text-lg text-orange-400 font-sans text-center  mt-5"> Enter the six-digit code here please</p>
       </div> 

       <div >

         <form className="m-14 flex">
         <input type="text" className="border-4 border-orange-400 w-10 p-2 m-2"/>
         <input type="text" className="border-4 border-orange-400 w-10 p-2 m-2"/>
         <input type="text" className="border-4 border-orange-400 w-10 p-2 m-2"/>
         <input type="text" className="border-4 border-orange-400 w-10 p-2 m-2"/>
         <input type="text" className="border-4 border-orange-400 w-10 p-2 m-2"/>
         <input type="text" className="border-4 border-orange-400 w-10 p-2 m-2"/>
         </form>
         <button type="submit" className="bg-orange-400 p-2 rounded-xl ml-44 mb-3"> Submit </button>


       </div>

   </div>
)
   
}
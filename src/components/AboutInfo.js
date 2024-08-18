import React from 'react'

const AboutInfo = ({ item }) => {
    return (
        <div className="mb-4">
            <h1 className="font-semibold text-orange-400 text-xl md:text-3xl text-center my-9 tracking-widest">
                {item.title}
            </h1>
            {
                item.description.map((item, index) => <p className='my-4' key={index}>{item}</p>)
            }
            {
                item.promise ? (
                    item.promise.map((item, index) => (
                        <div key={index}>
                            <h2 className="font-semibold text-orange-400 text-xl md:text-3xl tracking-widest">{item.promTitle}</h2>
                            {
                                item.promDesc.map((item, index) => <p className='my-4' key={index}>{item}</p>)
                            }
                        </div>
                    ))

                ) : ""
            }
        </div>
    )
}

export default AboutInfo
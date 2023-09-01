import React, { useEffect, useState } from 'react'
import CardFeatures from './cardFeatures'
import FilterProduct from './filterProduct'
import { useSelector } from 'react-redux'

const AllProducts = ({ header }) => {
    const productData = useSelector((state) => state.product.productList)
    const categoryList = [...new Set(productData.map(el => el.category))]

    //filter product
    const [filterby, setFilterBy] = useState("")
    const [datafilter, setDataFilter] = useState([])

    useEffect(() => {
        setDataFilter(productData)
    }, [productData])

    const hanfleDataFilter = (category) => {
        const filter = productData.filter(el => el.category.toLowerCase() === category.toLowerCase())
        setDataFilter(() => {
            return [
                ...filter
            ]
        })
    }


    return (
        <div className='m-5'>
            <h2 className='text-black text-xl font-semibold'>{header}</h2>
            <div className='gap-5 flex justify-center scrollbar-none overflow-scroll'>
                {
                    categoryList[0] && categoryList.map(el => {
                        return (
                            <FilterProduct category={el} onClick={() => hanfleDataFilter(el)} />
                        )
                    })
                }

            </div>
            <div className=' flex flex-wrap justify-center gap-4 my-4'>
                {
                    datafilter.map(el => {
                        return (
                            <CardFeatures
                                key={el._id}
                                id={el._id}
                                name={el.name}
                                image={el.image}
                                price={el.price}
                            />
                        )
                    })
                }

            </div>

        </div>
    )
}

export default AllProducts
import React from 'react'
import { Button, Card, CardBody, CardImg, CardTitle } from 'react-bootstrap';
import formatCurrency from '../utilities/formatCurrency';

type StoreItemProps = {
    id: number;
    name: string;
    price: number;
    imgUrl: string;
}

function StoreItem({ id,name,price,imgUrl}:StoreItemProps) {
    const quantity = 1;
  return (
    <Card className='h-100'>
        <CardImg 
            variant='top'
            src={imgUrl}
            height='200px'
            style={{objectFit: 'cover'}}
        />
        <CardBody className='d-flex flex-column'> 
            <CardTitle className='d-flex justify-content-between align-items-baseline mb-4'>
                <span className='fs-2'>{name}</span>
                <span className='ms-2 text-muted'>{formatCurrency(price)}</span>
            </CardTitle>
            <div className='mt-auto'>
                {quantity ===  0 ? (
                    <Button className='w-100'>+ Add To Cart</Button>
                ) : <div className='d-flex align-items-center flex-column' style={{gap: '.5rem'}}>
                        <div className='d-flex align-items-center justify-content-center' style={{ gap: '.5rem'}}>
                            <Button>+</Button>
                            <div>
                                <span className='fs-3'>{quantity}</span> in cart
                            </div>
                            <Button>-</Button>
                        </div>
                        <Button variant='danger' size='sm'>Remove</Button>
                    </div>}
            </div>
        </CardBody>
    </Card>
  )
}

export default StoreItem
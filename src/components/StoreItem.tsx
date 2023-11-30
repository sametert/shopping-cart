import React from 'react'
import { Card, CardBody, CardImg, CardTitle } from 'react-bootstrap';
import formatCurrency from '../utilities/formatCurrency';

type StoreItemProps = {
    id: number;
    name: string;
    price: number;
    imgUrl: string;
}

function StoreItem({ id,name,price,imgUrl}:StoreItemProps) {
  return (
    <Card>
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
        </CardBody>
    </Card>
  )
}

export default StoreItem
import React, { ReactNode, createContext, useContext, useState } from 'react'
import ShoppingCart from '../components/ShoppingCart'

type ShoppingCartProviderProps = {
    children: ReactNode
}

type ShoppingCartContext = {
    openCart: () => void
    closeCart: () => void
    getItemQuantity : (id:number) => number
    increaseCartQuantity : (id: number) => void
    decreaseCartQuantity : (id: number) => void
    removeFromCart : (id: number)  => void
    cartQuantity: number  //sepetimizdeki toplam ürün sayısı
    cartItems: CartItem[]
}

type CartItem = {
    id: number;
    quantity: number;
}

const ShoppingCartContext = createContext({} as ShoppingCartContext)

function useShoppingCart() {
  return useContext(ShoppingCartContext); 
}

export function ShoppingCartProvider({ children }:ShoppingCartProviderProps) {
    //tüm sepet bilgilerini burada saklıyoruz.
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const [isOpen, setIsOpen] = useState(false);

    const openCart = () => setIsOpen(true);

    const closeCart = () => setIsOpen(false);

    const cartQuantity = cartItems.reduce((quantity, item) => item.quantity +  quantity,0);

    function getItemQuantity(id: number) {
        // burada kaç quantity var? onu buluyoruz.
        return cartItems.find(item => item.id === id)?.quantity || 0
    }

    function increaseCartQuantity(id: number) {
        //setCartItems içindeki currItems parametresi aslında prev'dir.  Yani en son mevcut state'dir.
        setCartItems(currItems =>  {
            if (currItems.find(item => item.id === id) == null) {
                //eğer hiç item yoksa item miktarı ekliyoruz(quantity)
                return [...currItems, {id, quantity:1 }]
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return {
                            ...item, quantity: item.quantity + 1
                        }
                    } else {
                        //hiçbir değişiklik yapmadan öğemizi istiyoruz
                        return item
                    }
                })
            }
        })
    }

    function decreaseCartQuantity(id: number) {
        setCartItems(currItems =>  {
            if (currItems.find(item => item.id === id)?.quantity === 1) {
                //BURAYA BİRDAHA BAK
                return currItems.filter(item => item.id !== id)
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return {
                            ...item, quantity: item.quantity - 1
                        }
                    } else {
                        return item
                    }
                })
            }
        })
    }

    function removeFromCart(id: number) {
        setCartItems(currItems => {
            return currItems.filter(item => item.id !== id)
        })
    }
    
    return (
        <ShoppingCartContext.Provider value={{ getItemQuantity , increaseCartQuantity , decreaseCartQuantity , removeFromCart , cartItems , cartQuantity , openCart ,  closeCart }}>
            {children}
            <ShoppingCart isOpen={isOpen}/>
        </ShoppingCartContext.Provider>
    )
}

export default useShoppingCart
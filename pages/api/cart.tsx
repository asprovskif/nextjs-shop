import {NextApiHandler} from 'next';
import {fetchJson} from '../../lib/api';
import {CMS_URL} from '../../lib/lib.const';
import {CartItem} from '../../lib/cart';

function stripCart(cartItem: any): CartItem {
    return {
        id: cartItem.id,
        product: {
            id: cartItem.product.id,
            title: cartItem.product.title,
            price: cartItem.product.price,
        },
        quantity: cartItem.quantity,
    }
}

const handleCart: NextApiHandler<CartItem> = async (req, res) => {
    const {jwt} = req.cookies;
    if (!jwt) {
        res.status(401).end();
        return;
    }

    try {
        const cartItems = await fetchJson(`${CMS_URL}/cart`, {
            headers: {'Authorization': `Bearer ${jwt}`},
        })

        return res.status(200).json(cartItems.map(stripCart));
    } catch (err) {
        res.status(401).end();
    }
}

export default handleCart;
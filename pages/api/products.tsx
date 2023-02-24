import {NextApiHandler} from 'next';
import {getProducts, Product} from '../../lib/products';

const handler: NextApiHandler<Product[]> = async (req, res) => {
    const products = await getProducts();
    res.status(200).json(products);
}

export default handler;
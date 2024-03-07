import type { IGoods } from '../../models/IGoods';

import './goodsitem.scss';

interface IGoodsItem {
    goodsItem: IGoods;
}

const GoodsItem: React.FC<IGoodsItem> = ({ goodsItem }) => {
    const { id, brand, product, price } = goodsItem;

    return (
        <div className="goods-item">
            <div className="goods-item__field">{id}</div>
            <div className="goods-item__field">{product}</div>
            <div className="goods-item__field">{brand}</div>
            <div className="goods-item__field">{price}</div>
        </div>
    );
};
export default GoodsItem;

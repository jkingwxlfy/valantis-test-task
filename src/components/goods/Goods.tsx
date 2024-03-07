import type { IGoods } from '../../models/IGoods';

import GoodsItem from '../goodsItem/GoodsItem';

import './goods.scss';

interface IGoodsProps {
    goods: IGoods[];
}

const Goods: React.FC<IGoodsProps> = ({ goods }) => {
    return (
        <div className="goods">
            {goods.map((item) => (
                <GoodsItem key={item.id} goodsItem={item} />
            ))}
        </div>
    );
};
export default Goods;

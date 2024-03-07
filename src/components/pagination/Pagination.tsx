import './pagination.scss';

interface IPaginationProps {
    pagesArray: number[];
    offset: number;
    setOffset: (value: number) => void;
    isLoading: boolean;
}

const Pagination: React.FC<IPaginationProps> = ({
    pagesArray,
    offset,
    setOffset,
    isLoading,
}) => {
    return (
        <div className="pagination">
            <div className="pagination__wrapper">
                {pagesArray.length > 1
                    ? pagesArray.map((item) => (
                          <span
                              className={`pagination__item ${offset === item ? 'selected' : ''} ${isLoading ? 'disabled' : ''}`}
                              key={item}
                              onClick={() => setOffset(item)}
                          >
                              {item + 1}
                          </span>
                      ))
                    : null}
            </div>
        </div>
    );
};
export default Pagination;

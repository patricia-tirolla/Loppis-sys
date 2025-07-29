import useFetch from '../../API/useFetch';
import './Reports.css';

const Reports = () => {
    const { data: sellersReport, error, loading } = useFetch('http://localhost:3001/reports/totalBySeller', 'GET')

    if (loading) return <p>Loading orders...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="page">
            <h2 className="page-title">Sales Report</h2>

            <table className="report-table">
                <caption className="table-caption">Report of total sales by seller</caption>
                <thead>
                    <tr>
                        <th scope="col" className="report-id">Seller ID</th>
                        <th scope="col">Seller Name</th>
                        <th scope="col">Total Sales</th>
                    </tr>
                </thead>
                <tbody>
                    {sellersReport.map((seller) => (
                        <tr
                            key={seller.seller_id}
                            className="report-row">
                            <td className="report-id">{seller.seller_id}</td>
                            <td>{seller.name}</td>
                            <td>{Number(seller.total).toFixed(2)}:-</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    )
};

export default Reports
import { useEffect, useState } from 'react';
import reportsRepo from '../../API/reports';
import './Reports.css';

const Reports = () => {
    const [sellersReport, setSellerslReport] = useState([]);

    useEffect(() => {
        const fetchTotalReports = async () => {
            const fetchedTotalReports = await reportsRepo.getSellersTotalReport();
            setSellerslReport(fetchedTotalReports);
        }
        fetchTotalReports();
    }, [])

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
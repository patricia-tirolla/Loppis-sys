import { useEffect, useState } from "react";
import reportsRepo from "../../API/reports";

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
        <>
            <h2>This is the report</h2>
            <ul>
                {sellersReport.map((seller) => (
                    <li>
                        <p>{seller.seller_id}</p>
                        <p>{seller.name}</p>
                        <p>{seller.total}</p>
                    </li>
                ))}
            </ul>
        </>
    )
};

export default Reports
const getSellersTotalReport = async () => {
    try {
        const response = await fetch(`http://localhost:3001/reports/totalBySeller`);
        if (response.ok) {
            const json = await response.json();
            return json;
        } else {
            console.error("failed to fetch order item", response.status);
        }
    } catch (err) {
        console.error("Couldn't fetch: ", err);
    }
};

const reportsRepo = { getSellersTotalReport }

export default reportsRepo
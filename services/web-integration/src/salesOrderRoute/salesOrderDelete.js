import gql from 'graphql-tag';

const DELETE_SALES_ORDER = gql`
    mutation DeleteSalesOrder($where: SalesOrderWhereUniqueInput!, $data: SalesOrderUpdateInput!){
        updateSalesOrder(where: $where, data: $data) {
            id,
            state
        }
    }
`;

export default ({ config, client, salesOrderRoute }) => (
    salesOrderRoute.put('/:salesOrderId', (req, res) => {
        const salesOrderId = req.query.salesOrderId
        console.log("Run DeleteSalesOrder" + salesOrderId);
        client.mutate({
            mutation: DELETE_SALES_ORDER,
            variables: {
                where: {
                    id: salesOrderId
                },
                data: {
                    state: "DELETED"
                }
            },
        }).then(value => {
            console.log(value);
            res.json({ status: "DELETED", salesOrderId })
        }).catch((error) => {
            console.log(error)
            res.json(error)
        });

    })
);

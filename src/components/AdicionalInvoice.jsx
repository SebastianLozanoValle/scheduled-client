export const AdicionalInvoice = ({ invoice }) => {
    return (
        <div>
            <h3>Link Checkout:</h3>
            <div className="my-4">
                <a className="px-8 py-2 rounded bg-[#d3983f] text-white" target="_blank" href={'https://'+invoice.link}>Pagar</a>
            </div>
        </div>
    );
}
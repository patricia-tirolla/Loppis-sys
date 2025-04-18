import './App.css';

function App() {

  return (
    <>
      <section className="home-guidance">
        <h2>Welcome to Loppis-sys 👋</h2>
        <p>
          This application helps you manage sellers, products, orders, and reports — all in one place. Here's how to get started:
        </p>

        <ol>
          <li>
            <strong>Sellers:</strong> Add and manage the individuals or shops participating in your loppis (flea market).
          </li>
          <li>
            <strong>Products:</strong> Register the items for sale, associate them with sellers, and track their availability.
          </li>
          <li>
            <strong>Orders:</strong> Create and manage customer orders, track payments, and view order history.
          </li>
          <li>
            <strong>Reports:</strong> View summaries of total sales, seller earnings, and product performance.
          </li>
        </ol>

        <p>
          Use the navigation menu to access each section. All changes are saved automatically as you work.
        </p>

        <p>
          Start by registering a seller, then add all the products that seller is offering. Once you've set up your sellers and products, you're ready to start selling!
        </p>

        <p>
          To make a sale, create a new order and add items by inserting their product IDs. Items are added directly to the order, and the total is calculated automatically.
        </p>

        <p>
          In the Reports section, you can see how much each seller has sold — making it easy to calculate and issue their payments.
        </p>

        <p>
          If you need any help or run into issues, don’t hesitate to contact your system admin or support team.
        </p>
      </section>

    </>
  );
}

export default App;

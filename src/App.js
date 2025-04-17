import './App.css';

function App() {

  return (
    <>
      <section className="home-guidance">
        <h2>Welcome to Loppis-sys 👋</h2>
        <p>This application helps you manage your sellers, products, orders, and reports in one place. Here's how to get started:</p>

        <ol>
          <li>
            <strong>Sellers:</strong> Add and manage the individuals or shops participating in your loppis (flea market).
          </li>
          <li>
            <strong>Products:</strong> Register items being sold, associate them with sellers, and track availability.
          </li>
          <li>
            <strong>Orders:</strong> Create and manage customer orders, track payments, and view order history.
          </li>
          <li>
            <strong>Reports:</strong> View summaries of sales, seller earnings, and product performance.
          </li>
        </ol>

        <p>Use the navigation menu to access each section. All changes are saved automatically as you work.</p>

        <p>If you need any help or run into issues, don't hesitate to contact your system admin or support team.</p>
      </section>
    </>
  );
}

export default App;

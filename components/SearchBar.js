import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

export default function FakeStore() {
    const styles = {
        main: {
            padding: '20px',
            color: 'white',
            maxWidth: '1200px',
            margin: '0 auto',
        },
        grid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '20px',
            marginTop: '20px'
        },
        gridItem: {
            backgroundColor: '#1333',
            padding: '15px',
            borderRadius: '8px',
            textAlign: 'center'
        },
        gridItemImage: {
            width: '100px',
            height: '100px',
            objectFit: 'cover',
            borderRadius: '5px'
        },
        gridItemHeading: {
            margin: '10px 0'
        },
        gridItemParagraph: {
            margin: '10px 0'
        }
    };
    
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetch('https://fakestoreapi.com/products?limit=20')
            .then(res => res.json())
            .then(json => {
                setProducts(json);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching products:", error);
                setLoading(false);
            });
    }, []);
    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <p>Loading products...</p>;
    }

    return (
        <div>
            <h2>Product List</h2>
            <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
             <div style={styles.grid}>
                    {filteredProducts.map((item) => (
                        <div key={item.id} style={styles.gridItem}>
                            <h3 style={styles.gridItemHeading}>{`$${item.price}`}</h3>
                            <img src={item.image} alt={item.title} style={styles.gridItemImage}/>
                            <p style={styles.gridItemParagraph}>{item.title}</p>
                        </div>
                    ))}
            </div>
        </div>
        
    );
}
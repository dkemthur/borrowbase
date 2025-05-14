import { useState } from 'react';
import { Card, CardContent } from './components/ui/card';
import { Button } from "./components/ui/button";
import { Textarea } from "./components/ui/textarea";
import './App.css';

interface BorrowItem {
    id: number;
    name: string;
    image: string;
    contact: string;
}

const itemsForBorrow: BorrowItem[] = [
    {
        id: 1,
        name: 'Book: The Alchemist',
        image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=800&q=60',
        contact: 'alice@example.com',
    },
    {
        id: 2,
        name: 'Tent',
        image: 'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?auto=format&fit=crop&w=800&q=60',
        contact: 'bob@example.com',
    },
    {
        id: 3,
        name: 'Guitar',
        image: 'https://images.unsplash.com/photo-1511376777868-611b54f68947?auto=format&fit=crop&w=800&q=60',
        contact: 'carol@example.com',
    },
];


export default function BorrowBase() {
    const [selectedItem, setSelectedItem] = useState<BorrowItem | null>(null);
    const [request, setRequest] = useState<string>('');
    const [review, setReview] = useState<string>('');
    const [submittedRequests, setSubmittedRequests] = useState<string[]>([]);
    const [submittedReviews, setSubmittedReviews] = useState<string[]>([]);

    return (
        <div className="container">
            <h1 className="title">BorrowBase</h1>

            <section>
                <h2 className="section-title">Items Available for Borrowing</h2>
                <div className="item-grid">
                    {itemsForBorrow.map((item) => (
                        <Card key={item.id} onClick={() => setSelectedItem(item)} className="item-card">
                            <CardContent>
                                <img src={item.image} alt={item.name} className="item-image" />
                                <p className="item-name">{item.name}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                {selectedItem && (
                    <div className="contact-info">
                        <h3>Contact Info</h3>
                        <p>{selectedItem.contact}</p>
                    </div>
                )}
            </section>

            <section>
                <h2 className="section-title">Request an Item</h2>
                <Textarea
                    placeholder="Describe the item you wish to borrow..."
                    value={request}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setRequest(e.target.value)}
                />
                <Button onClick={() => {
                    if (request) {
                        setSubmittedRequests([...submittedRequests, request]);
                        setRequest('');
                    }
                }}>
                    Submit Request
                </Button>
            </section>

            <section>
                <h2 className="section-title">Leave an Anonymous Review</h2>
                <Textarea
                    placeholder="Share your feedback about BorrowBase..."
                    value={review}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setReview(e.target.value)}
                />
                <Button onClick={() => {
                    if (review) {
                        setSubmittedReviews([...submittedReviews, review]);
                        setReview('');
                    }
                }}>
                    Submit Review
                </Button>
            </section>

            <section>
                <h2 className="section-title">About Overconsumption</h2>
                <p>
                    Overconsumption contributes to resource depletion, environmental degradation, and waste. To combat it,
                    consider borrowing or sharing items instead of purchasing new ones, recycling, and buying second-hand when possible.
                    BorrowBase is a step toward creating a sustainable, community-focused culture.
                </p>
            </section>
        </div>
    );
}

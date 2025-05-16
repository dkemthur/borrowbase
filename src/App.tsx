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
        name: 'The Alchemist (Book)',
        image: 'https://thesciencesurvey.com/wp-content/uploads/2023/02/IMG-20230210-WA0000.jpeg?auto=format&fit=crop&w=300&q=80',
        contact: 'alice@example.com',
    },
    {
        id: 2,
        name: 'Camping Tent',
        image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=300&q=80',
        contact: 'bob@example.com',
    },
    {
        id: 3,
        name: 'Acoustic Guitar',
        image: 'https://images.unsplash.com/photo-1511376777868-611b54f68947?auto=format&fit=crop&w=300&q=80',
        contact: 'carol@example.com',
    },
    {
        id: 4,
        name: 'Portable Projector',
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=300&q=80',
        contact: 'dave@example.com',
    },
    {
        id: 5,
        name: 'Electric Drill',
        image: 'https://images.unsplash.com/photo-1574717024655-6d70eeb1cd3b?auto=format&fit=crop&w=300&q=80',
        contact: 'emma@example.com',
    },
    {
        id: 6,
        name: 'Board Game: Catan',
        image: 'https://images.unsplash.com/photo-1611967164526-c1d62db21746?auto=format&fit=crop&w=300&q=80',
        contact: 'frank@example.com',
    },
    {
        id: 7,
        name: 'Bike (Medium)',
        image: 'https://images.unsplash.com/photo-1589571894960-20bbe2828d0a?auto=format&fit=crop&w=300&q=80',
        contact: 'grace@example.com',
    },
    {
        id: 8,
        name: 'Lawn Mower',
        image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=300&q=80',
        contact: 'henry@example.com',
    },
    {
        id: 9,
        name: 'DJI Drone',
        image: 'https://images.unsplash.com/photo-1549921296-3a4a6c4e9c89?auto=format&fit=crop&w=300&q=80',
        contact: 'ivy@example.com',
    },
];



export default function BorrowBase() {
    const [selectedItem, setSelectedItem] = useState<BorrowItem | null>(null);
    const [request, setRequest] = useState<string>('');
    const [review, setReview] = useState<string>('');
    const [submittedRequests, setSubmittedRequests] = useState<string[]>([]);
    const [submittedReviews, setSubmittedReviews] = useState<string[]>([]);
    const [activeTab, setActiveTab] = useState<'items' | 'request' | 'review' | 'about'>('items');

    return (
        <div className="container">
            <h1 className="title">BorrowBase</h1>

            <nav className="tab-nav">
                <button onClick={() => setActiveTab('items')} className={activeTab === 'items' ? 'active' : ''}>Items</button>
                <button onClick={() => setActiveTab('request')} className={activeTab === 'request' ? 'active' : ''}>Request</button>
                <button onClick={() => setActiveTab('review')} className={activeTab === 'review' ? 'active' : ''}>Review</button>
                <button onClick={() => setActiveTab('about')} className={activeTab === 'about' ? 'active' : ''}>About</button>
            </nav>

            {activeTab === 'items' && (
                <section>
                    <h2 className="section-title">Items Available for Borrowing</h2>
                    <div className="item-grid item-grid-4">
                        {itemsForBorrow.map((item) => (
                            <Card key={item.id} className="item-card" onClick={() => setSelectedItem(item)}>
                                <CardContent>
                                    <img src={item.image} alt={item.name} className="cropped-image" />
                                    <p className="item-name">{item.name}</p>
                                    {selectedItem?.id === item.id && (
                                        <div className="contact-info pop-out">
                                            <h3>Contact Info</h3>
                                            <p>{item.contact}</p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>
            )}

            {activeTab === 'request' && (
                <section className="request-section">
                    <h2 className="section-title">Request an Item</h2>
                    <p className="description">Looking for something specific? Let the community know what you need.</p>
                    <Textarea
                        placeholder="e.g. I'd like to borrow a bike for the weekend."
                        value={request}
                        className="textarea-box"
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setRequest(e.target.value)}
                    />
                    <div className="button-row">
                        <Button onClick={() => {
                            if (request) {
                                setSubmittedRequests([...submittedRequests, request]);
                                setRequest('');
                            }
                        }}>
                            Submit Request
                        </Button>
                    </div>
                    {submittedRequests.length > 0 && (
                        <div className="submitted-list">
                            <h3>Previous Requests</h3>
                            <ul>
                                {submittedRequests.map((req, idx) => (
                                    <li key={idx}>&#8226; {req}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </section>
            )}

            {activeTab === 'review' && (
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
            )}

            {activeTab === 'about' && (
                <section>
                    <h2 className="section-title">About Overconsumption</h2>
                    <p>
                        Overconsumption contributes to resource depletion, environmental degradation, and waste. To combat it,
                        consider borrowing or sharing items instead of purchasing new ones, recycling, and buying second-hand when possible.
                        BorrowBase is a step toward creating a sustainable, community-focused culture.
                    </p>
                </section>
            )}
        </div>
    );
}
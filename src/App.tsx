import { useState } from 'react';
import { Card, CardContent } from './components/ui/card';
import { Button } from "./components/ui/button";
import { Input } from './components/ui/input';
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
        image: 'https://www.tripsavvy.com/thmb/-DkDDUjTS3nqisOa1XEd2cTf8l4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/campsite5-bde7fa2945cd45ef994556195fc43e7f.jpg',
        contact: 'bob@example.com',
    },
    {
        id: 3,
        name: 'Acoustic Guitar',
        image: 'https://i.etsystatic.com/13219099/r/il/333ab3/5803100305/il_1588xN.5803100305_d0p3.jpg',
        contact: 'carol@example.com',
    },
    {
        id: 4,
        name: 'Portable Projector',
        image: 'https://i.etsystatic.com/48775223/r/il/9b0c68/6644627524/il_1588xN.6644627524_ip0f.jpg',
        contact: 'dave@example.com',
    },
    {
        id: 5,
        name: 'Electric Drill',
        image: 'https://i.ebayimg.com/images/g/szkAAOSw-OFkz9sv/s-l1600.webp',
        contact: 'nancy@gmail.com',
    },
    {
        id: 6,
        name: 'Board Game: Catan',
        image: 'https://catanshop.com/images/thumbs/0002063_catan-board-game-base-game-6th-edition_600.png',
        contact: 'frank@example.com',
    },
    {
        id: 7,
        name: 'Bike (Medium)',
        image: 'https://i.etsystatic.com/32453045/r/il/4c4f8a/3947963855/il_1588xN.3947963855_pa0e.jpg',
        contact: 'grace@example.com',
    },
    {
        id: 8,
        name: 'Lawn Mower',
        image: 'https://i.etsystatic.com/29635719/r/il/0db0f3/6683578953/il_1588xN.6683578953_fhkk.jpg',
        contact: 'henry@example.com',
    },
    {
        id: 9,
        name: 'DJI Drone',
        image: 'https://i.etsystatic.com/28466306/r/il/c105d0/6349997664/il_1588xN.6349997664_3pku.jpg',
        contact: 'ivy@example.com',
    },
];

interface ReviewEntry {
    message: string;
    rating: number;
}


export default function BorrowBase() {
    const [selectedItem, setSelectedItem] = useState<BorrowItem | null>(null);
    const [request, setRequest] = useState<string>('');
    const [review, setReview] = useState<string>('');
    const [submittedRequests, setSubmittedRequests] = useState<string[]>([]);
    const [activeTab, setActiveTab] = useState<'items' | 'request' | 'review' | 'about'>('items');
    const [submittedReviews, setSubmittedReviews] = useState<ReviewEntry[]>([{
        message: 'Great initiative! Helped me find a camping tent last minute.',
        rating: 5
    }, {
        message: 'Nice idea, but would be good to add categories.',
        rating: 4
    }, {
        message: 'I love that this is community-powered. Keep going!',
        rating: 5
    }]);

    const [newItemDesc, setNewItemDesc] = useState('');
    const [newItemContact, setNewItemContact] = useState('');
    const [newItemImage, setNewItemImage] = useState<File | null>(null);

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

                    <hr style={{ margin: '2rem 0' }} />

                    <h2 className="section-title">Have Something to Offer?</h2>
                    <p className="description">Add your item for others to borrow.</p>
                    <Textarea
                        placeholder="Describe the item you'd like to offer..."
                        value={newItemDesc}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewItemDesc(e.target.value)}
                    />
                    <Input
                        type="email"
                        placeholder="Your contact email"
                        value={newItemContact}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewItemContact(e.target.value)}
                    />
                    <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setNewItemImage(e.target.files?.[0] || null)}
                    />
                    <div className="button-row">
                        <Button onClick={() => {
                            if (newItemDesc && newItemContact && newItemImage) {
                                alert('Thank you for contributing! Your item has been submitted.');
                                setNewItemDesc('');
                                setNewItemContact('');
                                setNewItemImage(null);
                            } else {
                                alert('Please fill in all fields and select an image.');
                            }
                        }}>
                            Submit Your Item
                        </Button>
                    </div>
                </section>
            )}

            {activeTab === 'review' && (
                <section className="review-section">
                    <h2 className="section-title">Leave an Anonymous Review</h2>
                    <Textarea
                        placeholder="Share your feedback about BorrowBase..."
                        value={review}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setReview(e.target.value)}
                    />
                    <Button onClick={() => {
                        if (review) {
                            setSubmittedReviews([...submittedReviews, { message: review, rating: 5 }]);
                            setReview('');
                        }
                    }}>
                        Submit Review
                    </Button>

                    <div className="submitted-list">
                        <h3>What others are saying</h3>
                        <ul>
                            {submittedReviews.map((r, i) => (
                                <li key={i}>
                                    <p>"{r.message}"</p>
                                    <p>Rating: {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
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
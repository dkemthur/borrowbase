import {useState} from 'react';
import {Card, CardContent} from './components/ui/card';
import {Button} from "./components/ui/button";
import {Input} from './components/ui/input';
import {Textarea} from "./components/ui/textarea";
import './App.css';

interface BorrowItem {
    id: number;
    name: string;
    image: string;
    contact: string;
}

const itemsForBorrow: BorrowItem[] = [
    {
        id: 5,
        name: 'Electric Drill',
        image: 'https://i.ebayimg.com/images/g/szkAAOSw-OFkz9sv/s-l1600.webp',
        contact: 'vikram.rao@gmail.com',
    },
    {
        id: 1,
        name: 'The Alchemist (Book)',
        image: 'https://thesciencesurvey.com/wp-content/uploads/2023/02/IMG-20230210-WA0000.jpeg?auto=format&fit=crop&w=300&q=80',
        contact: 'tim.smith@yahoo.com',
    },
    {
        id: 2,
        name: 'Camping Tent',
        image: 'https://www.tripsavvy.com/thmb/-DkDDUjTS3nqisOa1XEd2cTf8l4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/campsite5-bde7fa2945cd45ef994556195fc43e7f.jpg',
        contact: 'jones@hotmail.com',
    },
    {
        id: 3,
        name: 'Acoustic Guitar',
        image: 'https://i.etsystatic.com/13219099/r/il/333ab3/5803100305/il_1588xN.5803100305_d0p3.jpg',
        contact: 'carol@yahoo.com',
    },
    {
        id: 4,
        name: 'Portable Projector',
        image: 'https://i.etsystatic.com/48775223/r/il/9b0c68/6644627524/il_1588xN.6644627524_ip0f.jpg',
        contact: 'dave@example.com',
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
    const [activeTab, setActiveTab] = useState<'items' | 'request' | 'review' | 'about' | 'stats'>('items');
    const [submittedReviews, setSubmittedReviews] = useState<ReviewEntry[]>([{
        message: 'Great initiative! Helped me find a camping tent for my trip last minute.',
        rating: 5
    }, {
        message: 'Nice idea, but would be good to add categories.',
        rating: 4
    }, {
        message: 'Easily able to borrow a dress for a casual party',
        rating: 5
    },
        {
            message: 'Was able to find a bike for my quick trip and did not have to spend money on a new one!',
            rating: 5
        }
        ]);

    const [newItemDesc, setNewItemDesc] = useState('');
    const [newItemContact, setNewItemContact] = useState('');
    const [newItemImage, setNewItemImage] = useState<File | null>(null);

    return (
        <div className="container">
            <h1 className="title">BorrowBase</h1>

            <nav className="tab-nav">
                <button onClick={() => setActiveTab('items')} className={activeTab === 'items' ? 'active' : ''}>Items
                </button>
                <button onClick={() => setActiveTab('request')}
                        className={activeTab === 'request' ? 'active' : ''}>Request
                </button>
                <button onClick={() => setActiveTab('review')}
                        className={activeTab === 'review' ? 'active' : ''}>Review
                </button>
                <button onClick={() => setActiveTab('about')} className={activeTab === 'about' ? 'active' : ''}>About
                </button>
                <button onClick={() => setActiveTab('stats')} className={activeTab === 'stats' ? 'active' : ''}>Stats</button>
            </nav>

            {activeTab === 'items' && (
                <section>
                    <h2 className="section-title">Items Available for Borrowing</h2>
                    <div className="item-grid item-grid-4">
                        {itemsForBorrow.map((item) => (
                            <Card key={item.id} className="item-card" onClick={() => setSelectedItem(item)}>
                                <CardContent>
                                    <img src={item.image} alt={item.name} className="cropped-image"/>
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

                    <hr style={{margin: '2rem 0'}}/>

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
                            setSubmittedReviews([...submittedReviews, {message: review, rating: 5}]);
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
                        Overconsumption is the excessive use of resources beyond our needs, driven by a culture of
                        convenience, fast fashion,
                        and single-use products. It leads to overflowing landfills, air and water pollution, and
                        irreversible environmental harm.
                    </p>
                    <p>
                        A large percentage of goods we buy end up in the trash within a year. Clothing, electronics, and
                        household items are often
                        discarded while still usable, contributing to massive waste. This cycle depletes natural
                        resources and creates unnecessary
                        emissions from production and transportation.
                    </p>
                    <p>
                        Borrowing, sharing, and reusing help reduce the demand for new production and promote a mindful
                        approach to consumption.
                        By participating in community initiatives like BorrowBase, you're directly reducing landfill
                        contributions and saving valuable
                        resources.
                    </p>
                    <div style={{display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1rem'}}>
                        <img
                            src="https://www.greenpeace.org/static/planet4-international-stateless/2017/05/GP0STR51M_Medium_res-1024x684.jpg"
                            alt="Overconsumption shopping"
                            style={{maxWidth: '100%', width: '300px', borderRadius: '8px'}}
                        />
                        <img
                            src="https://www.hwhenvironmental.com/wp-content/uploads/2019/06/1.png"
                            alt="Landfill waste"
                            style={{maxWidth: '100%', width: '300px', borderRadius: '8px'}}
                        />
                        <img
                            src="https://www.vice.com/wp-content/uploads/sites/2/2022/04/1649077695561-gettyimages-1334518699.jpeg"
                            alt="Landfill waste"
                            style={{maxWidth: '100%', width: '300px', borderRadius: '8px'}}
                        />
                    </div>
                </section>
            )}

            {activeTab === 'stats' && (
                <section>
                    <h2 className="section-title">Community Impact</h2>
                    <p>Items shared: 53</p>
                    <p>Requests submitted: 27</p>
                    <p>Reviews shared: {submittedReviews.length}</p>
                    <div style={{ marginTop: '2rem' }}>
                        <img
                            src="https://media.licdn.com/dms/image/v2/C4D12AQGTPokDX6EWig/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1619170711672?e=2147483647&v=beta&t=5Bz527MSS3PV74qLk9mY0GPDF66UiVhIRZy56RhF5Gw"
                            alt="Love the Earth"
                            style={{ width: '150px', animation: 'pulse 2s infinite' }}
                        />
                        <style>
                            {`@keyframes pulse {
                0% { transform: scale(1); opacity: 1; }
                50% { transform: scale(1.1); opacity: 0.8; }
                100% { transform: scale(1); opacity: 1; }
              }`}
                        </style>
                    </div>
                </section>
            )}
        </div>
    );
}

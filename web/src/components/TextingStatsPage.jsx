import React, { useState } from 'react';


// List of image filenames in the data folder
const imageFiles = [
    'messages_and_words_sent_vs_received_pie_charts.png',
    'messages_by_day_of_week_seaborn.png',
    'messages_by_hour_of_day_seaborn.png',
    'messages_heatmap_seaborn.png',
    'messages_per_month_seaborn.png',
];

// Custom captions for each image
const imageCaptions = {
    'messages_and_words_sent_vs_received_pie_charts.png': 'Man of few words meets yapper! I\'m so lucky to have such a loquacious friend!',
    'messages_by_day_of_week_seaborn.png': 'It looks like most of our texts are sent early in the week to plan our perfect weekends which we spend in person! We usually see each other at least Thursday-Sunday every week.',
    'messages_by_hour_of_day_seaborn.png': 'We immediately start texting when I wake up at 9am, drop off in the later afternoon to evening, and blast off again, peaking at 10pm. Looks like at least one of us goes to sleep at 1am but there have been texts at every hour of the day!',
    'messages_heatmap_seaborn.png': 'Combining the last two bar graphs into a heatmap, we can see how much we text Mon-Wed at the beginning of the week and also when we wake up later on weekend at 11am. We\'re least likely to text on Fridays because we usually hang out on Fridays.',
    'messages_per_month_seaborn.png': 'A steady increase in texts per month until our change in friendship dynamic solidifying in July.',
};

const stats = [
    { label: '🗃️ Total entries', value: '28,902', color: '#ffb36b' },
    { label: '📅 First text', value: 'Nov 4th, 2024', color: '#6bc1ff' },
    { label: '📆 Total number of days', value: '279', color: '#f7d06c' },
    { label: '📈 Percentage of days with messages', value: '96.77%', color: '#ff6b6b' },
    { label: '💬 Average messages per day', value: '103.59', color: '#6bffb3' },
    { label: '📝 Total word count', value: '244,686', color: '#b36cff' },
    { label: '✉️ Average words per message', value: '8.47', color: '#ffb36b' },
    { label: '📊 Average words per day', value: '877.01', color: '#6bc1ff' },
    { label: '🔥 Longest streak', value: '127 days (Starting April 6th)', color: '#f7d06c' },
    { label: '🏆 Most active day', value: 'June 4th with 493 messages', color: '#ff6b6b' },
    { label: '⏳ Longest gap between messages', value: '6 days (Starting Nov 4th)', color: '#6bffea' },
];

export default function TextingStatsPage() {
  const [magnified, setMagnified] = useState(null);

const statsPerRow = 4;

// Split stats into rows of 4
const statRows = [];
for (let i = 0; i < stats.length; i += statsPerRow) {
    statRows.push(stats.slice(i, i + statsPerRow));
}

return (
    <div className="flex flex-col items-center justify-center w-full h-full py-8 px-2" style={{ minHeight: '90vh', background: 'linear-gradient(135deg, #f7d06c 0%, #ffb36b 100%)', position: 'relative' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#b36cff', marginBottom: '1.5rem', textShadow: '0 2px 8px #fff8' }}>
            📱 Our Texting Adventure!
        </h2>
        <div style={{ maxWidth: 900, width: '100%' }}>
            {statRows.map((row, rowIdx) => (
                <div
                    key={rowIdx}
                    className="grid gap-4 mb-4"
                    style={{
                        gridTemplateColumns: `repeat(${row.length}, minmax(0, 1fr))`,
                        width: '100%',
                    }}
                >
                    {row.map((stat, i) => (
                        <div
                            key={i}
                            style={{
                                background: stat.color,
                                color: '#222',
                                borderRadius: 16,
                                padding: '1rem 2rem',
                                fontWeight: 'bold',
                                fontSize: '1.2rem',
                                boxShadow: '0 2px 12px #0001',
                                margin: 4,
                                minWidth: 0,
                                textAlign: 'center',
                                flex: '1 1 0',
                                transition: 'transform 0.2s',
                                cursor: 'pointer',
                            }}
                            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.07)')}
                            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                        >
                            <div style={{ fontSize: '1.1rem', opacity: 0.7 }}>{stat.label}</div>
                            <div style={{ fontSize: '2rem', marginTop: 6 }}>{stat.value}</div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
        <h3 style={{ fontSize: '2rem', color: '#ff6b6b', margin: '2rem 0 1rem', fontWeight: 700, textShadow: '0 2px 8px #fff8' }}>
            📊 Our Message Memories (Click to Enlarge)
        </h3>
        <div className="flex flex-wrap justify-center gap-6" style={{ maxWidth: 1200 }}>
            {imageFiles.map((img, i) => (
                <div key={img} style={{ margin: 8, cursor: 'pointer', borderRadius: 12, overflow: 'hidden', boxShadow: '0 2px 12px #0002', background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img
                        src={`/data/${img}`}
                        alt={img.replace(/_/g, ' ').replace('.png', '').replace(/\b\w/g, l => l.toUpperCase())}
                        style={{ width: 220, height: 140, objectFit: 'cover', borderRadius: 12, transition: 'transform 0.2s', boxShadow: magnified === img ? '0 4px 24px #b36cff88' : '0 2px 12px #0002' }}
                        onClick={() => setMagnified(img)}
                    />
                </div>
            ))}
        </div>
        {magnified && (
            <div
                onClick={() => setMagnified(null)}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    background: 'rgba(0,0,0,0.7)',
                    zIndex: 100,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'zoom-out',
                    flexDirection: 'column',
                }}
            >
                <img
                    src={`/data/${magnified}`}
                    alt={magnified.replace(/_/g, ' ').replace('.png', '')}
                    style={{ maxWidth: '90vw', maxHeight: '80vh', borderRadius: 18, boxShadow: '0 8px 32px #0008', background: '#fff' }}
                />
                <div style={{ marginTop: 18, fontSize: '1.3rem', color: '#fff', textAlign: 'center', textShadow: '0 2px 8px #000a', background: 'rgba(0,0,0,0.3)', borderRadius: 8, padding: '8px 18px', maxWidth: '90vw' }}>
                    {imageCaptions[magnified] || magnified}
                </div>
            </div>
        )}
    </div>
);
}

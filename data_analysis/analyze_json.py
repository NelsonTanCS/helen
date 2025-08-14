"""
Analyze the data in text_with_helen_merged_sorted_clean.json

Instructions:
- Place this script in the data_analysis folder.
- Make sure the JSON file is at ../data/text_with_helen_merged_sorted_clean.json relative to this script.
- Run with: python analyze_json.py

How to use:
1. Load the JSON data into a Python list of dicts.
2. To select a field, iterate over the list and access the key, e.g. item['has_image'].
3. To aggregate, use collections.Counter, sum, or pandas for more complex analysis.

Example aggregations:
- Count how many entries have images: sum(item['has_image'] for item in data)
- Count total entries: len(data)
- Count by any field: use Counter([item['field'] for item in data])

You can add more fields and logic as needed for your analysis.
"""

import json
from collections import Counter
from datetime import datetime, timedelta

# Load data
with open('../data/text_with_helen_merged_sorted_clean.json', 'r', encoding='utf-8') as f:
    data = json.load(f)



# Replace date in data dictionary with parsed datetime object
for item in data:
    item['date'] = datetime.strptime(item['date'], "%Y%m%d %H:%M:%S")

# Remove October entries
print(f"Entries before removing October: {len(data)}")
data = [item for item in data if item['date'].month != 10]

# Example: Count total entries
print(f"Total entries: {len(data)}")

first_date = data[0]['date']
last_date = data[-1]['date']
num_days = (last_date - first_date).days
unique_dates = set(dt.date() for dt in (item['date'] for item in data))

print(f"First date: {first_date.strftime('%Y-%m-%d')}")
print(f"Last date: {last_date.strftime('%Y-%m-%d')}")

print(f"Total number of days: {num_days}")
print(f"Total number of unique dates: {len(unique_dates)}")
print (f"Percentage of days with messages: {len(unique_dates) / num_days * 100:.2f}%")

print("")

messages_per_day = len(data) / num_days
print(f"Average messages per day: {messages_per_day:.2f}")

word_counts = []
sent_word_counts = []
received_word_counts = []
for item in data:
    if 'body' in item:
        word_count = len(item['body'].split())
        word_counts.append(word_count)
        if item.get('type') == 'sent':
            sent_word_counts.append(word_count)
        elif item.get('type') == 'received':
            received_word_counts.append(word_count)

word_count_total = sum(word_counts)
print(f"Total word count: {word_count_total}")
print(f"Average words per message: {word_count_total / len(data) if data else 0:.2f}")
print(f"Average words per day: {word_count_total / num_days if num_days else 0:.2f}")
# print(f"Total sent messages: {len(sent_word_counts)}, Average words per sent message: {sum(sent_word_counts) / len(sent_word_counts) if sent_word_counts else 0:.2f}, Percent sent messages: {len(sent_word_counts) / len(data) * 100:.2f}%")
# print(f"Total received messages: {len(received_word_counts)}, Average words per received message: {sum(received_word_counts) / len(received_word_counts) if received_word_counts else 0:.2f}, Percent received messages: {len(received_word_counts) / len(data) * 100:.2f}%")
# Longest streak (fixed: use unique sorted dates)
unique_dates_sorted = sorted(set(item['date'].date() for item in data))
longest_streak = 1
current_streak = 1
streak_start = unique_dates_sorted[0]
longest_streak_start = unique_dates_sorted[0]

for i in range(1, len(unique_dates_sorted)):
    if unique_dates_sorted[i] == unique_dates_sorted[i-1] + timedelta(days=1):
        current_streak += 1
        if current_streak > longest_streak:
            longest_streak = current_streak
            longest_streak_start = streak_start
    else:
        current_streak = 1
        streak_start = unique_dates_sorted[i]
print(f"Longest streak of consecutive days with messages: {longest_streak} days, starting on {longest_streak_start}")

# Most active day
most_active_day = Counter(item['date'].date() for item in data).most_common(1)
if most_active_day:
    most_active_date, most_active_count = most_active_day[0]
    print(f"Most active day: {most_active_date} with {most_active_count} messages")

# Most active hour
most_active_hour = Counter(item['date'].strftime('%H') for item in data).most_common(1)
if most_active_hour:
    most_active_hour, most_active_count = most_active_hour[0]
    print(f"Most active hour: {most_active_hour} with {most_active_count} messages")

# Longest gap and what date range was it
longest_gap = 0
longest_gap_start = None
longest_gap_end = None
for i in range(1, len(data)):
    gap = (data[i]['date'] - data[i-1]['date']).days
    if gap > longest_gap:
        longest_gap = gap
        longest_gap_start = data[i-1]['date']
        longest_gap_end = data[i]['date']
print(f"Longest gap between messages: {longest_gap} days in November")
# print(f"Date range of longest gap: {longest_gap_start.strftime('%Y-%m-%d %H:%M:%S')} to {longest_gap_end.strftime('%Y-%m-%d %H:%M:%S')}")

# Image counts
image_counts = Counter(item.get('has_image', False) for item in data)
print(f"Image count: {image_counts.get(True, 0)}")
print(f"Average images per day: {image_counts.get(True, 0) / num_days if num_days else 0:.2f}")
print("")

# Messages per month
messages_for_each_month = Counter(dt.strftime('%Y-%m') for dt in (item['date'] for item in data))
# print(f"Messages per month: {messages_for_each_month}")

# Graph of messages per month
import matplotlib.pyplot as plt
import seaborn as sns
months = sorted(messages_for_each_month.keys())
counts = [messages_for_each_month[month] for month in months]
sns.set(style="whitegrid")
# plt.figure(figsize=(10, 5))
# sns.barplot(x=months, y=counts, palette="Blues_d")
# plt.xlabel('Month')
# plt.ylabel('Number of Messages')
# plt.title('Messages per Month')
# plt.xticks(rotation=45)
# plt.tight_layout()
# # Set hue of bar color based on count (brighter for more messages, darker for fewer)
# norm_counts = [(c - min(counts)) / (max(counts) - min(counts)) if max(counts) != min(counts) else 0.5 for c in counts]
# colors = [sns.color_palette("Blues", as_cmap=True)(norm) for norm in norm_counts]
# bars = plt.bar(months, counts, color=colors)
# # Put labels on top of the bars
# for i, count in enumerate(counts):
#     plt.text(i, count + 0.5, str(count), ha='center', va='bottom')
# plt.savefig('../data/messages_per_month_seaborn.png')

# Group messages by day of week
day_of_week_counts = Counter(item['date'].strftime('%A') for item in data)
# Sort by day of week starting on Monday
days_of_week = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
day_of_week_counts = {day: day_of_week_counts.get(day, 0) for day in days_of_week}
# print(f"Messages by day of week: {day_of_week_counts}")

# Group messages by hour of day
hour_of_day_counts = Counter(item['date'].strftime('%H') for item in data)
hours_of_day = [f"{hour:02d}" for hour in range(9, 24)] + [f"{hour:02d}" for hour in range(0, 9)]
hour_of_day_counts = {hour: hour_of_day_counts.get(hour, 0) for hour in hours_of_day}
# print(f"Messages by hour of day: {hour_of_day_counts}")

# # Visualize messages by day of week
# plt.figure(figsize=(10, 5))
# sns.barplot(x=list(day_of_week_counts.keys()), y=list(day_of_week_counts.values()), palette="Greens_d")
# plt.xlabel('Day of Week')
# plt.ylabel('Number of Messages')
# plt.title('Messages by Day of Week')
# plt.xticks(rotation=45)
# plt.tight_layout()
# # Set hue of bar color based on count (brighter for more messages, darker for fewer)
# norm_counts = [(c - min(day_of_week_counts.values())) / (max(day_of_week_counts.values()) - min(day_of_week_counts.values())) if max(day_of_week_counts.values()) != min(day_of_week_counts.values()) else 0.5 for c in day_of_week_counts.values()]
# colors = [sns.color_palette("Greens", as_cmap=True)(norm) for norm in norm_counts]
# bars = plt.bar(day_of_week_counts.keys(), day_of_week_counts.values(), color=colors)
# # Put labels on top of the bars
# for i, count in enumerate(day_of_week_counts.values()):
#     plt.text(i, count + 0.5, str(count), ha='center', va='bottom')
# plt.savefig('../data/messages_by_day_of_week_seaborn.png')

# # Visualize messages by hour of day
# plt.figure(figsize=(10, 5))
# sns.barplot(x=list(hour_of_day_counts.keys()), y=list(hour_of_day_counts.values()), palette="Reds_d")
# plt.xlabel('Hour of Day')
# plt.ylabel('Number of Messages')
# plt.title('Messages by Hour of Day')
# plt.xticks(rotation=45)
# plt.tight_layout()
# # Set hue of bar color based on count (brighter for more messages, darker for fewer)
# norm_counts = [(c - min(hour_of_day_counts.values())) / (max(hour_of_day_counts.values()) - min(hour_of_day_counts.values())) if max(hour_of_day_counts.values()) != min(hour_of_day_counts.values()) else 0.5 for c in hour_of_day_counts.values()]
# colors = [sns.color_palette("Reds", as_cmap=True)(norm) for norm in norm_counts]
# bars = plt.bar(hour_of_day_counts.keys(), hour_of_day_counts.values(), color=colors)
# # Put labels on top of the bars
# for i, count in enumerate(hour_of_day_counts.values()):
#     plt.text(i, count + 0.5, str(count), ha='center', va='bottom')
# plt.savefig('../data/messages_by_hour_of_day_seaborn.png')

# # Heatmap of messages by day of week and hour of day
# # Build a 2D array: rows=days, cols=hours, values=message counts
# heatmap_data = []
# for day in days_of_week:
#     row = []
#     for hour in hours_of_day:
#         count = sum(1 for item in data if item['date'].strftime('%A') == day and item['date'].strftime('%H') == hour)
#         row.append(count)
#     heatmap_data.append(row)

# plt.figure(figsize=(12, 6))
# sns.heatmap(heatmap_data, annot=False, fmt="d", cmap="YlGnBu", xticklabels=hours_of_day, yticklabels=days_of_week)
# plt.xlabel('Hour of Day')
# plt.ylabel('Day of Week')
# plt.title('Messages Heatmap by Day of Week and Hour of Day')
# plt.tight_layout()
# plt.savefig('../data/messages_heatmap_seaborn.png')

# # Cumulative messages over time by month in a line graph
# cumulative_counts = []
# current_count = 0
# for month in months:
#     current_count += messages_for_each_month[month]
#     cumulative_counts.append(current_count)
# plt.figure(figsize=(10, 5))
# plt.plot(months, cumulative_counts, marker='o', color='blue')
# plt.xlabel('Month')
# plt.ylabel('Cumulative Messages')
# plt.title('Cumulative Messages Over Time')
# plt.xticks(rotation=45)
# plt.tight_layout()
# plt.savefig('../data/cumulative_messages_over_time.png')

# Side-by-side pie charts: Messages Sent vs Received and Words Sent vs Received
fig, axes = plt.subplots(1, 2, figsize=(16, 8))

# Pie chart of messages sent vs received
sent_count = sum(1 for item in data if item.get('type') == 'sent')
received_count = sum(1 for item in data if item.get('type') == 'received')
labels = ['Nelson', 'Helen']
sizes = [sent_count, received_count]
colors = ['#8da0cb', '#e78ac3']
# Add actual numbers to labels
labels_with_counts = [f"{label}\n({count})" for label, count in zip(labels, sizes)]
axes[0].pie(sizes, labels=labels_with_counts, autopct='%1.1f%%', startangle=140, colors=colors)
axes[0].axis('equal')
axes[0].set_title('Messages Sent vs Received')

# Pie chart of words sent vs received
sent_word_count = sum(sent_word_counts)
received_word_count = sum(received_word_counts)
labels = ['Nelson # of Words', 'Helen # of Words']
sizes = [sent_word_count, received_word_count]
colors = ['#8da0cb', '#e78ac3']
# Add actual numbers to labels
labels_with_counts = [f"{label}\n({count})" for label, count in zip(labels, sizes)]
axes[1].pie(sizes, labels=labels_with_counts, autopct='%1.1f%%', startangle=140, colors=colors)
axes[1].axis('equal')
axes[1].set_title('Words Sent vs Received')

plt.tight_layout()
plt.savefig('../data/messages_and_words_sent_vs_received_pie_charts.png')
export const DEFAULT_MEMBERS = [
  { id: 'm1', name: 'Alex', role: 'Admin', avatar: '👨‍💻', color: 'from-blue-500 to-cyan-500', status: 'Home', points: 340 },
  { id: 'm2', name: 'Elena', role: 'Partner', avatar: '👩‍🎨', color: 'from-purple-500 to-pink-500', status: 'Home', points: 420 },
  { id: 'm3', name: 'Leo', role: 'Kid', avatar: '👦', color: 'from-amber-400 to-orange-500', status: 'School', points: 195 },
  { id: 'm4', name: 'Maya', role: 'Kid', avatar: '👧', color: 'from-emerald-400 to-teal-500', status: 'Home', points: 280 }
];

export const DEFAULT_CHORES = [
  { id: 'c1', title: 'Take out recycling & compost', points: 20, assigneeId: 'm3', category: 'Cleaning', frequency: 'Weekly', dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], status: 'Pending' },
  { id: 'c2', title: 'Run dishwasher & wipe counters', points: 30, assigneeId: 'm1', category: 'Kitchen', frequency: 'Daily', dueDate: new Date().toISOString().split('T')[0], status: 'Completed' },
  { id: 'c3', title: 'Vacuum 2nd floor & stairs', points: 45, assigneeId: 'm2', category: 'Cleaning', frequency: 'Weekly', dueDate: new Date(Date.now() + 172800000).toISOString().split('T')[0], status: 'Pending' },
  { id: 'c4', title: 'Water balcony garden & herbs', points: 15, assigneeId: 'm4', category: 'Garden', frequency: 'Daily', dueDate: new Date().toISOString().split('T')[0], status: 'Pending' },
  { id: 'c5', title: 'Restock bathroom supplies', points: 25, assigneeId: 'm2', category: 'Maintenance', frequency: 'Monthly', dueDate: new Date(Date.now() + 259200000).toISOString().split('T')[0], status: 'Pending' }
];

export const DEFAULT_DEVICES = [
  { id: 'd1', name: 'Living Room Lights', room: 'Living Room', type: 'light', state: { on: true, brightness: 80, color: '#f59e0b', scene: 'Warm Evening' } },
  { id: 'd2', name: 'Main Thermostat', room: 'Hallway', type: 'climate', state: { currentTemp: 72, targetTemp: 70, mode: 'cool', fan: 'auto', eco: false } },
  { id: 'd3', name: 'Front Porch Lock', room: 'Entrance', type: 'lock', state: { locked: true, battery: 94, autoLock: true } },
  { id: 'd4', name: 'Robot Vacuum (RoboClean)', room: 'Entire House', type: 'vacuum', state: { status: 'docked', battery: 100, mode: 'Standard' } },
  { id: 'd5', name: 'Living Room 4K TV', room: 'Living Room', type: 'tv', state: { on: true, app: 'Netflix', volume: 22, muted: false } },
  { id: 'd6', name: 'Kitchen Espresso Maker', room: 'Kitchen', type: 'coffee', state: { status: 'standby', waterLevel: 85, scheduledBrew: '07:00 AM' } },
  { id: 'd7', name: 'Security Perimeter', room: 'Entrance', type: 'security', state: { armed: 'home', sensorsActive: 8, alarms: 0 } },
  { id: 'd8', name: 'Backyard String Lights', room: 'Garden', type: 'light', state: { on: false, brightness: 100, color: '#ec4899', scene: 'Party' } },
];

export const DEFAULT_GROCERIES = [
  { id: 'g1', name: 'Almond Milk (Unsweetened)', category: 'Dairy & Alt', qty: '2 Cartons', inCart: false, price: 5.98, urgency: 'high' },
  { id: 'g2', name: 'Organic Sourdough Bread', category: 'Bakery', qty: '1 Loaf', inCart: true, price: 4.50, urgency: 'medium' },
  { id: 'g3', name: 'Avocados (Hass)', category: 'Produce', qty: '4 Pack', inCart: false, price: 4.99, urgency: 'high' },
  { id: 'g4', name: 'Greek Yogurt (Plain 0%)', category: 'Dairy & Alt', qty: '1 Big Tub', inCart: false, price: 6.20, urgency: 'low' },
  { id: 'g5', name: 'Cold Brew Coffee Concentrate', category: 'Beverages', qty: '1 Bottle', inCart: false, price: 8.49, urgency: 'medium' },
  { id: 'g6', name: 'Eco Dishwasher Pods', category: 'Household', qty: '1 Box (45ct)', inCart: true, price: 14.99, urgency: 'low' }
];

export const DEFAULT_PANTRY = [
  { id: 'p1', name: 'Olive Oil Extra Virgin', qty: '75%', expires: '2026-11-15', status: 'fresh' },
  { id: 'p2', name: 'Basmati Rice', qty: '3 kg', expires: '2027-02-20', status: 'fresh' },
  { id: 'p3', name: 'Cheddar Cheese Block', qty: '20%', expires: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0], status: 'expiring' },
  { id: 'p4', name: 'Baby Spinach', qty: '50%', expires: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0], status: 'expiring' },
  { id: 'p5', name: 'Rolled Oats', qty: '1.5 kg', expires: '2026-12-10', status: 'fresh' }
];

export const DEFAULT_EXPENSES = [
  { id: 'e1', title: 'Fiber Gigabit Internet', category: 'Utilities', amount: 79.99, paidBy: 'm1', splitBetween: ['m1', 'm2'], date: '2026-10-01', recurring: true },
  { id: 'e2', title: 'Weekly Whole Foods Grocery', category: 'Groceries', amount: 142.50, paidBy: 'm2', splitBetween: ['m1', 'm2'], date: '2026-10-04', recurring: false },
  { id: 'e3', title: 'HVAC Air Filter Replacement (4-Pack)', category: 'Home Maintenance', amount: 48.00, paidBy: 'm1', splitBetween: ['m1', 'm2'], date: '2026-10-05', recurring: false },
  { id: 'e4', title: 'Netflix 4K Family Plan', category: 'Subscriptions', amount: 22.99, paidBy: 'm2', splitBetween: ['m1', 'm2'], date: '2026-10-02', recurring: true },
  { id: 'e5', title: 'Home Insurance Monthly', category: 'Housing', amount: 95.00, paidBy: 'm1', splitBetween: ['m1', 'm2'], date: '2026-10-03', recurring: true }
];

export const DEFAULT_EVENTS = [
  { id: 'ev1', title: 'Family Movie & Pizza Night 🍕', date: new Date().toISOString().split('T')[0], time: '19:00', memberId: 'm1', category: 'Family' },
  { id: 'ev2', title: 'Leo Soccer Tournament ⚽', date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0], time: '10:00', memberId: 'm3', category: 'Sports' },
  { id: 'ev3', title: 'Plumbing Inspection 🔧', date: new Date(Date.now() + 86400000 * 4).toISOString().split('T')[0], time: '14:30', memberId: 'm2', category: 'Home' },
  { id: 'ev4', title: 'Maya Piano Recital 🎹', date: new Date(Date.now() + 86400000 * 6).toISOString().split('T')[0], time: '16:00', memberId: 'm4', category: 'School' }
];

export const DEFAULT_STICKIES = [
  { id: 's1', text: "Don't forget to take the recycling out before 8am tomorrow! ♻️", author: 'Alex', color: 'bg-amber-500/20 border-amber-500/40 text-amber-200', date: 'Today' },
  { id: 's2', text: "Leo aced his science quiz today! Ice cream celebration tonight 🎉", author: 'Elena', color: 'bg-emerald-500/20 border-emerald-500/40 text-emerald-200', date: 'Today' },
  { id: 's3', text: "WiFi Password changed: StarlightOrbit#2026 for guest devices", author: 'Alex', color: 'bg-blue-500/20 border-blue-500/40 text-blue-200', date: 'Oct 3' }
];

export const DEFAULT_MAINTENANCE = [
  { id: 'm1', task: 'Replace AC HEPA Filter', interval: 'Every 90 Days', lastDone: '2026-08-10', nextDue: '2026-11-10', status: 'Good', notes: 'Filter size 20x25x4 in attic unit.' },
  { id: 'm2', task: 'Test Smoke & CO Detectors', interval: 'Every 30 Days', lastDone: '2026-09-15', nextDue: '2026-10-15', status: 'Upcoming', notes: '9V batteries stored in laundry cabinet.' },
  { id: 'm3', task: 'Water Heater Flush & Check', interval: 'Yearly', lastDone: '2025-11-20', nextDue: '2026-11-20', status: 'Good', notes: 'Turn off gas valve first before draining.' },
  { id: 'm4', task: 'Clean Gutter Downspouts', interval: 'Twice a year', lastDone: '2026-04-12', nextDue: '2026-10-25', status: 'Upcoming', notes: 'Call Mike the handyman or use ladder stabilizer.' }
];

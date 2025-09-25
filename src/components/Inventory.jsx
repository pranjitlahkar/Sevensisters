'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from '@/css/inventory.module.css';

const Inventory = () => {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [activeCategory, setActiveCategory] = useState('all');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [counters, setCounters] = useState({});
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [particles, setParticles] = useState([]);

  const sectionRef = useRef(null);
  const itemsRef = useRef([]);

  // Generate particle positions once (client-side only)
  useEffect(() => {
    const generated = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      delay: `${i * 0.4}s`,
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`,
      duration: `${6 + Math.random() * 4}s`,
    }));
    setParticles(generated);
  }, []);

  // Enhanced inventory data with equipment images
  const inventoryData = [
    {
      id: 1,
      category: 'distillation',
      name: 'Copper Pot Stills',
      count: 8,
      unit: 'Units',
      capacity: '5,000L each',
      description: 'Premium copper pot stills crafted in Scotland for artisanal whiskey production with traditional techniques',
      icon: '🏺',
      status: 'operational',
      efficiency: '95%',
      lastMaintenance: '2024-07-15',
      nextMaintenance: '2024-10-15',
      image: '/images/inventory/labelling.jpg',
      specifications: [
        'Material: Pure Scottish Copper',
        'Heat Source: Steam Heated',
        'Temperature Control: Precision Digital',
        'Origin: Forsyths Scotland'
      ]
    },
    {
      id: 2,
      category: 'distillation',
      name: 'Column Stills',
      count: 4,
      unit: 'Units',
      capacity: '10,000L each',
      description: 'High-efficiency column stills with advanced rectification plates for continuous premium distillation',
      icon: '🏭',
      status: 'operational',
      efficiency: '98%',
      lastMaintenance: '2024-06-20',
      nextMaintenance: '2024-09-20',
      image: '/images/inventory/lab.jpg',
      specifications: [
        'Plates: 20 Bubble Cap Plates',
        'Material: Stainless Steel 316L',
        'Automation: PLC Controlled',
        'Efficiency: 98.5% Ethanol Recovery'
      ]
    },
    // ... keep your other inventory items here ...
  ];

  // Categories for filtering
  const categories = [
    { id: 'all', name: 'All Equipment', icon: '📋', color: 'var(--rich-gold)' },
    { id: 'distillation', name: 'Distillation', icon: '🏺', color: 'var(--warm-bronze)' },
    { id: 'fermentation', name: 'Fermentation', icon: '🛢️', color: 'var(--rich-gold)' },
    { id: 'storage', name: 'Storage', icon: '⚗️', color: 'var(--warm-bronze)' },
    { id: 'processing', name: 'Processing', icon: '⚙️', color: 'var(--rich-gold)' },
    { id: 'quality', name: 'Quality Control', icon: '🧪', color: 'var(--warm-bronze)' },
    { id: 'packaging', name: 'Packaging', icon: '🍾', color: 'var(--rich-gold)' }
  ];

  // Summary statistics
  const summaryStats = [
    {
      label: 'Total Production Capacity',
      value: '2.5M',
      unit: 'Liters/Year',
      icon: '📈',
      color: 'var(--rich-gold)'
    },
    {
      label: 'Equipment Units',
      value: inventoryData
        .reduce((sum, item) => sum + item.count, 0)
        .toLocaleString('en-US'), // ✅ fixed locale
      unit: 'Total Units',
      icon: '🏭',
      color: 'var(--warm-bronze)'
    },
    {
      label: 'Operational Efficiency',
      value: Math.round(
        inventoryData.reduce((sum, item) => sum + parseFloat(item.efficiency), 0) /
        inventoryData.length
      ),
      unit: '% Average',
      icon: '⚡',
      color: 'var(--rich-gold)'
    },
    {
      label: 'Storage Capacity',
      value: '1.2M',
      unit: 'Liters',
      icon: '📦',
      color: 'var(--warm-bronze)'
    }
  ];

  // Filter inventory based on active category
  const filteredInventory =
    activeCategory === 'all'
      ? inventoryData
      : inventoryData.filter((item) => item.category === activeCategory);

  // Intersection Observer for animations
  useEffect(() => {
    const observers = [];

    itemsRef.current.forEach((ref, index) => {
      if (ref) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setVisibleItems((prev) => new Set([...prev, index]));
            }
          },
          { threshold: 0.3 }
        );
        observer.observe(ref);
        observers.push(observer);
      }
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, [filteredInventory]);

  // Mouse and scroll tracking
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (rect) {
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
          y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    if (sectionRef.current) {
      sectionRef.current.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (sectionRef.current) {
        sectionRef.current.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  // Animated counters
  useEffect(() => {
    if (visibleItems.size > 0) {
      const timer = setTimeout(() => {
        filteredInventory.forEach((item, index) => {
          if (visibleItems.has(index)) {
            let currentCount = 0;
            const targetCount = item.count;
            const increment = Math.max(1, Math.ceil(targetCount / 50));

            const countAnimation = setInterval(() => {
              currentCount += increment;
              if (currentCount >= targetCount) {
                currentCount = targetCount;
                clearInterval(countAnimation);
              }
              setCounters((prev) => ({ ...prev, [item.id]: currentCount }));
            }, 30);
          }
        });
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [visibleItems, filteredInventory]);

  const parallaxOffset = Math.min(scrollY * 0.2, 150);
  const mouseParallaxX = mousePosition.x * 10;
  const mouseParallaxY = mousePosition.y * 8;

  return (
    <section className={styles.inventorySection} ref={sectionRef}>
    {/* Background Elements */}
    <div className={styles.backgroundElements}>
      <div className={styles.particleField}>
        {particles.map((p) => (
          <div
            key={p.id}
            className={styles.particle}
            style={{
              '--delay': p.delay,
              '--x': p.x,
              '--y': p.y,
              '--duration': p.duration,
            }}
          />
        ))}
      </div>
    </div>

    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>Inventory Management</h1>
        <p className={styles.subtitle}>
          Premium distillery equipment and production capabilities
        </p>
      </div>

      {/* Summary Statistics */}
      <div className={styles.summaryGrid}>
        {summaryStats.map((stat, index) => (
          <div key={index} className={styles.summaryCard}>
            <div className={styles.summaryIcon}>{stat.icon}</div>
            <div className={styles.summaryValue}>{stat.value}</div>
            <div className={styles.summaryLabel}>{stat.label}</div>
            <div className={styles.summaryUnit}>{stat.unit}</div>
          </div>
        ))}
      </div>

      {/* Category Filters */}
      <div className={styles.categoryFilters}>
        {categories.map((category) => (
          <button
            key={category.id}
            className={`${styles.categoryButton} ${
              activeCategory === category.id ? styles.active : ''
            }`}
            onClick={() => setActiveCategory(category.id)}
          >
            <span className={styles.categoryIcon}>{category.icon}</span>
            {category.name}
          </button>
        ))}
      </div>

      {/* Inventory Grid */}
      <div className={styles.inventoryGrid}>
        {filteredInventory.map((item, index) => (
          <div
            key={item.id}
            ref={(el) => (itemsRef.current[index] = el)}
            className={styles.inventoryItem}
            onClick={() => setSelectedEquipment(item)}
          >
            {/* Updated Image Section */}
            <div className={styles.itemImage}>
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{
                    objectFit: 'cover',
                  }}
                  className={styles.equipmentImage}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
              ) : (
                // Fallback icon if no image
                <div className={styles.fallbackIcon}>
                  {item.icon}
                </div>
              )}
            </div>
            
            <div className={styles.itemContent}>
              <div className={styles.itemHeader}>
                <h3 className={styles.itemName}>{item.name}</h3>
                <span className={styles.itemStatus}>{item.status}</span>
              </div>

              <div className={styles.itemStats}>
                <div className={styles.statItem}>
                  <div className={styles.statValue}>
                    {counters[item.id] || 0}
                  </div>
                  <div className={styles.statLabel}>{item.unit}</div>
                </div>
                <div className={styles.statItem}>
                  <div className={styles.statValue}>{item.efficiency}</div>
                  <div className={styles.statLabel}>Efficiency</div>
                </div>
              </div>

              <p className={styles.itemDescription}>{item.description}</p>

              <div className={styles.itemDetails}>
                <span className={styles.capacityInfo}>
                  Capacity: {item.capacity}
                </span>
                <span className={styles.efficiencyBadge}>
                  {item.efficiency}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Equipment Modal */}
    {selectedEquipment && (
      <div 
        className={`${styles.equipmentOverlay} ${styles.active}`}
        onClick={() => setSelectedEquipment(null)}
      >
        <div 
          className={styles.equipmentModal}
          onClick={(e) => e.stopPropagation()}
        >
          <h2>{selectedEquipment.name}</h2>
          <p>{selectedEquipment.description}</p>
          <button onClick={() => setSelectedEquipment(null)}>Close</button>
        </div>
      </div>
    )}
  </section>
  );
};

export default Inventory;

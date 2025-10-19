import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  volume: number;
  marketCap: number;
  sparkline: number[];
}

const generateSparkline = (basePrice: number) => {
  const points = [];
  let price = basePrice;
  for (let i = 0; i < 24; i++) {
    price = price * (1 + (Math.random() - 0.5) * 0.05);
    points.push(price);
  }
  return points;
};

const mockCryptoData: CryptoData[] = [
  {
    id: 'btc',
    symbol: 'BTC',
    name: 'Bitcoin',
    price: 67234.12,
    change24h: 3.45,
    volume: 28500000000,
    marketCap: 1320000000000,
    sparkline: generateSparkline(67234)
  },
  {
    id: 'eth',
    symbol: 'ETH',
    name: 'Ethereum',
    price: 3456.78,
    change24h: -1.23,
    volume: 15200000000,
    marketCap: 415000000000,
    sparkline: generateSparkline(3456)
  },
  {
    id: 'bnb',
    symbol: 'BNB',
    name: 'BNB',
    price: 598.45,
    change24h: 5.67,
    volume: 2100000000,
    marketCap: 89000000000,
    sparkline: generateSparkline(598)
  },
  {
    id: 'sol',
    symbol: 'SOL',
    name: 'Solana',
    price: 142.89,
    change24h: 8.92,
    volume: 3800000000,
    marketCap: 63000000000,
    sparkline: generateSparkline(142)
  },
  {
    id: 'ada',
    symbol: 'ADA',
    name: 'Cardano',
    price: 0.4523,
    change24h: -2.45,
    volume: 520000000,
    marketCap: 15900000000,
    sparkline: generateSparkline(0.45)
  }
];

const newsData = [
  {
    id: 1,
    title: 'Квантовые компьютеры революционизируют блокчейн технологию',
    time: '2 часа назад',
    category: 'Технологии',
    icon: 'Cpu'
  },
  {
    id: 2,
    title: 'Марсианская колония запускает собственную крипто-экономику',
    time: '5 часов назад',
    category: 'Космос',
    icon: 'Rocket'
  },
  {
    id: 3,
    title: 'ИИ-алгоритмы предсказывают рост Bitcoin на 300%',
    time: '8 часов назад',
    category: 'Прогноз',
    icon: 'Brain'
  },
  {
    id: 4,
    title: 'Нейроинтерфейсы позволяют торговать силой мысли',
    time: '12 часов назад',
    category: 'Инновации',
    icon: 'Zap'
  }
];

const priceHistoryData = Array.from({ length: 30 }, (_, i) => ({
  date: `${i + 1}`,
  BTC: 65000 + Math.random() * 5000,
  ETH: 3200 + Math.random() * 500,
  SOL: 130 + Math.random() * 30
}));

const volumeData = [
  { name: 'BTC', volume: 28.5, fill: 'hsl(var(--chart-1))' },
  { name: 'ETH', volume: 15.2, fill: 'hsl(var(--chart-2))' },
  { name: 'BNB', volume: 2.1, fill: 'hsl(var(--chart-3))' },
  { name: 'SOL', volume: 3.8, fill: 'hsl(var(--chart-4))' },
  { name: 'ADA', volume: 1.2, fill: 'hsl(var(--chart-5))' }
];

const technicalIndicators = [
  { name: 'Quantum RSI', value: 67.8, status: 'Оптимально', trend: 'up' },
  { name: 'AI MACD', value: 245.6, status: 'Бычий тренд', trend: 'up' },
  { name: 'Neural MA', value: 66234, status: 'Поддержка', trend: 'neutral' },
  { name: 'Blockchain Index', value: 892, status: 'Стабильно', trend: 'up' }
];

const Index = () => {
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoData>(mockCryptoData[0]);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  };

  const formatVolume = (volume: number) => {
    if (volume >= 1e9) return `$${(volume / 1e9).toFixed(2)}B`;
    if (volume >= 1e6) return `$${(volume / 1e6).toFixed(2)}M`;
    return `$${volume.toFixed(2)}`;
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/30 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/30 rounded-full blur-[120px] animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-float" style={{ animationDelay: '6s' }} />
      </div>

      <header className="border-b border-primary/20 bg-card/30 backdrop-blur-xl sticky top-0 z-50 neon-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative w-14 h-14 bg-gradient-to-br from-primary via-secondary to-accent rounded-2xl flex items-center justify-center animate-pulse-glow">
                <Icon name="Rocket" size={28} className="text-background" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary opacity-50 rounded-2xl blur-xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold glow-cyan tracking-wider">
                  CRYPTOFUTURE
                </h1>
                <div className="flex items-center gap-2 text-xs text-primary">
                  <Icon name="Cpu" size={12} />
                  <span className="font-mono">{time.toLocaleTimeString('ru-RU')}</span>
                  <span className="text-muted-foreground">UTC+3</span>
                </div>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              {['Портал', 'Аналитика', 'Рынки', 'Новости'].map((item, i) => (
                <button 
                  key={i}
                  className="relative text-sm font-medium text-foreground hover:text-primary transition-all group"
                >
                  <span className={i === 0 ? 'glow-cyan' : ''}>{item}</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all" />
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <Card className="col-span-full lg:col-span-8 bg-card/40 backdrop-blur-xl border-primary/30 card-glow overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent" />
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-4xl font-bold glow-cyan">{selectedCrypto.name}</CardTitle>
                  <p className="text-muted-foreground font-mono">{selectedCrypto.symbol}/USD</p>
                </div>
                <Badge 
                  variant={selectedCrypto.change24h > 0 ? "default" : "destructive"} 
                  className="text-xl px-6 py-3 font-bold rounded-xl"
                >
                  <Icon name={selectedCrypto.change24h > 0 ? "TrendingUp" : "TrendingDown"} size={20} className="mr-2" />
                  {selectedCrypto.change24h > 0 ? '+' : ''}{selectedCrypto.change24h.toFixed(2)}%
                </Badge>
              </div>
              <div className="text-5xl font-bold mt-4 glow-cyan font-mono">
                {formatPrice(selectedCrypto.price)}
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={priceHistoryData}>
                  <defs>
                    <linearGradient id="colorBTC" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.6}/>
                      <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorETH" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.6}/>
                      <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--primary))" opacity={0.2} />
                  <XAxis 
                    dataKey="date" 
                    stroke="hsl(var(--primary))" 
                    style={{ fontSize: '12px', fontFamily: 'monospace' }}
                  />
                  <YAxis 
                    stroke="hsl(var(--primary))" 
                    style={{ fontSize: '12px', fontFamily: 'monospace' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--primary))',
                      borderRadius: '12px',
                      backdropFilter: 'blur(20px)'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="BTC" 
                    stroke="hsl(var(--chart-1))" 
                    fill="url(#colorBTC)" 
                    strokeWidth={3}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="ETH" 
                    stroke="hsl(var(--chart-2))" 
                    fill="url(#colorETH)" 
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="col-span-full lg:col-span-4 space-y-4">
            <Card className="bg-card/40 backdrop-blur-xl border-primary/30 card-glow">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary to-accent" />
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Icon name="BarChart3" size={20} className="text-primary" />
                  Объёмы торгов
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={volumeData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--primary))" opacity={0.2} />
                    <XAxis 
                      dataKey="name" 
                      stroke="hsl(var(--primary))" 
                      style={{ fontSize: '12px' }}
                    />
                    <YAxis 
                      stroke="hsl(var(--primary))" 
                      style={{ fontSize: '12px' }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--primary))',
                        borderRadius: '8px'
                      }}
                      formatter={(value) => `${value}B`}
                    />
                    <Bar dataKey="volume" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-card/40 backdrop-blur-xl border-secondary/30 card-glow">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-primary" />
              <CardContent className="p-6 space-y-3">
                {technicalIndicators.slice(0, 2).map((indicator, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-xl border border-primary/20">
                    <div>
                      <p className="font-semibold text-sm text-primary">{indicator.name}</p>
                      <p className="text-xs text-muted-foreground">{indicator.status}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="TrendingUp" size={16} className="text-primary" />
                      <p className="text-lg font-bold font-mono">{indicator.value}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        <Tabs defaultValue="markets" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-card/40 backdrop-blur-xl border border-primary/30">
            <TabsTrigger value="markets" className="data-[state=active]:bg-primary data-[state=active]:text-background">
              <Icon name="TrendingUp" size={16} className="mr-2" />
              Рынки
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-secondary data-[state=active]:text-background">
              <Icon name="Activity" size={16} className="mr-2" />
              Аналитика
            </TabsTrigger>
            <TabsTrigger value="news" className="data-[state=active]:bg-accent data-[state=active]:text-background">
              <Icon name="Newspaper" size={16} className="mr-2" />
              Новости
            </TabsTrigger>
          </TabsList>

          <TabsContent value="markets" className="space-y-4 mt-6">
            <div className="grid gap-4">
              {mockCryptoData.map((crypto, index) => (
                <Card 
                  key={crypto.id} 
                  className={`cursor-pointer transition-all hover:border-primary backdrop-blur-xl ${
                    selectedCrypto.id === crypto.id 
                      ? 'border-primary bg-primary/10 card-glow' 
                      : 'bg-card/40 border-primary/20'
                  }`}
                  onClick={() => setSelectedCrypto(crypto)}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                      <div className="flex items-center gap-4">
                        <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center text-background font-bold text-lg">
                          {crypto.symbol.substring(0, 2)}
                          <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary opacity-50 rounded-full blur-md" />
                        </div>
                        <div>
                          <h3 className="font-bold text-xl">{crypto.name}</h3>
                          <p className="text-sm text-muted-foreground font-mono">{crypto.symbol}</p>
                        </div>
                      </div>

                      <div className="hidden md:block flex-1 max-w-[200px]">
                        <ResponsiveContainer width="100%" height={60}>
                          <LineChart data={crypto.sparkline.map((price, i) => ({ price, index: i }))}>
                            <Line 
                              type="monotone" 
                              dataKey="price" 
                              stroke={crypto.change24h > 0 ? 'hsl(var(--chart-3))' : 'hsl(var(--destructive))'} 
                              strokeWidth={2}
                              dot={false}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>

                      <div className="text-right space-y-2">
                        <p className="font-bold text-2xl font-mono glow-cyan">{formatPrice(crypto.price)}</p>
                        <Badge variant={crypto.change24h > 0 ? "default" : "destructive"} className="font-bold">
                          <Icon name={crypto.change24h > 0 ? "ArrowUp" : "ArrowDown"} size={14} className="mr-1" />
                          {crypto.change24h > 0 ? '+' : ''}{crypto.change24h.toFixed(2)}%
                        </Badge>
                      </div>

                      <div className="hidden lg:block text-right">
                        <p className="text-xs text-muted-foreground">Объём 24ч</p>
                        <p className="font-semibold text-lg font-mono text-primary">{formatVolume(crypto.volume)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-card/40 backdrop-blur-xl border-primary/30 card-glow">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary" />
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Brain" size={24} className="text-primary" />
                    ИИ-индикаторы
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {technicalIndicators.map((indicator, index) => (
                    <div key={index} className="relative flex items-center justify-between p-5 bg-gradient-to-r from-muted/50 to-muted/30 rounded-xl border border-primary/20 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent" />
                      <div className="relative z-10">
                        <p className="font-bold text-primary">{indicator.name}</p>
                        <p className="text-sm text-muted-foreground">{indicator.status}</p>
                      </div>
                      <div className="relative z-10 flex items-center gap-3">
                        <Icon name="Activity" size={20} className="text-primary" />
                        <p className="text-2xl font-bold font-mono glow-cyan">{indicator.value}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-card/40 backdrop-blur-xl border-secondary/30 card-glow">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary to-accent" />
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="PieChart" size={24} className="text-secondary" />
                    Доминация рынка
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockCryptoData.map((crypto, index) => {
                      const totalMarketCap = mockCryptoData.reduce((sum, c) => sum + c.marketCap, 0);
                      const percentage = (crypto.marketCap / totalMarketCap * 100).toFixed(1);
                      
                      return (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-bold">{crypto.symbol}</span>
                            <span className="text-primary font-mono font-bold">{percentage}%</span>
                          </div>
                          <div className="h-3 bg-muted/30 rounded-full overflow-hidden relative">
                            <div 
                              className="h-full bg-gradient-to-r from-primary via-secondary to-accent transition-all animate-pulse-glow"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="news" className="mt-6">
            <div className="grid gap-4">
              {newsData.map((news, index) => (
                <Card 
                  key={news.id} 
                  className="bg-card/40 backdrop-blur-xl border-primary/20 hover:border-primary hover:card-glow transition-all cursor-pointer group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                        <Icon name={news.icon as any} size={24} className="text-background" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge variant="outline" className="border-primary text-primary font-mono">{news.category}</Badge>
                          <span className="text-xs text-muted-foreground font-mono flex items-center gap-1">
                            <Icon name="Clock" size={12} />
                            {news.time}
                          </span>
                        </div>
                        <h3 className="font-bold text-lg group-hover:text-primary transition-colors leading-tight">
                          {news.title}
                        </h3>
                      </div>
                      <Icon name="ChevronRight" size={24} className="text-primary group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t border-primary/20 mt-20 bg-card/20 backdrop-blur-xl relative z-10">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                <Icon name="Rocket" size={20} className="text-background" />
              </div>
              <span className="font-bold text-lg glow-cyan">CRYPTOFUTURE</span>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <span className="text-muted-foreground flex items-center gap-2">
                <Icon name="Shield" size={14} />
                Квантовое шифрование
              </span>
              <span className="text-muted-foreground flex items-center gap-2">
                <Icon name="Zap" size={14} />
                ИИ-аналитика
              </span>
            </div>
            <p className="text-sm text-muted-foreground font-mono">
              © 2035 CryptoFuture • Quantum Edition
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

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
    title: 'Bitcoin достигает новых высот на фоне институционального спроса',
    time: '2 часа назад',
    category: 'Рынок'
  },
  {
    id: 2,
    title: 'Ethereum обновление улучшает масштабируемость сети',
    time: '5 часов назад',
    category: 'Технологии'
  },
  {
    id: 3,
    title: 'Регуляторы США обсуждают новые правила для криптовалют',
    time: '8 часов назад',
    category: 'Регулирование'
  },
  {
    id: 4,
    title: 'DeFi протокол привлекает $500M инвестиций',
    time: '12 часов назад',
    category: 'DeFi'
  }
];

const priceHistoryData = Array.from({ length: 30 }, (_, i) => ({
  date: `${i + 1} окт`,
  BTC: 65000 + Math.random() * 5000,
  ETH: 3200 + Math.random() * 500,
  SOL: 130 + Math.random() * 30
}));

const volumeData = [
  { name: 'BTC', volume: 28.5, fill: 'hsl(var(--chart-1))' },
  { name: 'ETH', volume: 15.2, fill: 'hsl(var(--chart-2))' },
  { name: 'BNB', volume: 2.1, fill: 'hsl(var(--chart-3))' },
  { name: 'SOL', volume: 3.8, fill: 'hsl(var(--chart-4))' },
  { name: 'Другие', volume: 12.4, fill: 'hsl(var(--muted))' }
];

const technicalIndicators = [
  { name: 'RSI (14)', value: 67.8, status: 'Перекуплен' },
  { name: 'MACD', value: 245.6, status: 'Бычий' },
  { name: 'MA (50)', value: 66234, status: 'Выше цены' },
  { name: 'Bollinger Bands', value: 'Средний', status: 'Нейтрально' }
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
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                <Icon name="TrendingUp" size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  CryptoFuture
                </h1>
                <p className="text-xs text-muted-foreground">{time.toLocaleTimeString('ru-RU')}</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <button className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Главная
              </button>
              <button className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                Аналитика
              </button>
              <button className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                Рынки
              </button>
              <button className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                Новости
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="col-span-full lg:col-span-2 bg-gradient-to-br from-card to-card/50 border-border/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-3xl font-bold">{selectedCrypto.name}</CardTitle>
                  <p className="text-muted-foreground">{selectedCrypto.symbol}/USD</p>
                </div>
                <Badge variant={selectedCrypto.change24h > 0 ? "default" : "destructive"} className="text-lg px-4 py-2">
                  {selectedCrypto.change24h > 0 ? '+' : ''}{selectedCrypto.change24h.toFixed(2)}%
                </Badge>
              </div>
              <div className="text-4xl font-bold mt-4">
                {formatPrice(selectedCrypto.price)}
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={priceHistoryData}>
                  <defs>
                    <linearGradient id="colorBTC" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorETH" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Area type="monotone" dataKey="BTC" stroke="hsl(var(--chart-1))" fill="url(#colorBTC)" strokeWidth={2} />
                  <Area type="monotone" dataKey="ETH" stroke="hsl(var(--chart-2))" fill="url(#colorETH)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="BarChart3" size={20} />
                Объёмы торгов (24ч)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={volumeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                    formatter={(value) => `${value}B`}
                  />
                  <Bar dataKey="volume" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="markets" className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto">
            <TabsTrigger value="markets">Рынки</TabsTrigger>
            <TabsTrigger value="analytics">Аналитика</TabsTrigger>
            <TabsTrigger value="news">Новости</TabsTrigger>
          </TabsList>

          <TabsContent value="markets" className="space-y-4 mt-6">
            <div className="grid gap-4">
              {mockCryptoData.map((crypto) => (
                <Card 
                  key={crypto.id} 
                  className={`cursor-pointer transition-all hover:border-primary/50 ${
                    selectedCrypto.id === crypto.id ? 'border-primary bg-primary/5' : 'bg-card/50'
                  }`}
                  onClick={() => setSelectedCrypto(crypto)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
                          {crypto.symbol.substring(0, 2)}
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">{crypto.name}</h3>
                          <p className="text-sm text-muted-foreground">{crypto.symbol}</p>
                        </div>
                      </div>

                      <div className="hidden md:block flex-1 mx-8">
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

                      <div className="text-right space-y-1">
                        <p className="font-bold text-xl">{formatPrice(crypto.price)}</p>
                        <Badge variant={crypto.change24h > 0 ? "default" : "destructive"}>
                          {crypto.change24h > 0 ? '+' : ''}{crypto.change24h.toFixed(2)}%
                        </Badge>
                      </div>

                      <div className="hidden lg:block text-right ml-8">
                        <p className="text-sm text-muted-foreground">Объём</p>
                        <p className="font-semibold">{formatVolume(crypto.volume)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-card/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Activity" size={20} />
                    Технические индикаторы
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {technicalIndicators.map((indicator, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium">{indicator.name}</p>
                        <p className="text-sm text-muted-foreground">{indicator.status}</p>
                      </div>
                      <p className="text-xl font-bold text-primary">{indicator.value}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-card/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="PieChart" size={20} />
                    Распределение капитализации
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
                            <span className="font-medium">{crypto.symbol}</span>
                            <span className="text-muted-foreground">{percentage}%</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-primary to-secondary transition-all"
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
              {newsData.map((news) => (
                <Card key={news.id} className="bg-card/50 hover:bg-card transition-colors cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">{news.category}</Badge>
                          <span className="text-xs text-muted-foreground">{news.time}</span>
                        </div>
                        <h3 className="font-semibold text-lg hover:text-primary transition-colors">
                          {news.title}
                        </h3>
                      </div>
                      <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t border-border mt-16 bg-card/30">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="TrendingUp" size={16} className="text-white" />
              </div>
              <span className="font-semibold">CryptoFuture</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 CryptoFuture. Данные обновляются в реальном времени.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

import React, { useEffect, useState } from 'react';
import { Bar, ChartComponentProps } from 'react-chartjs-2';
import { GoGraph } from 'react-icons/go';
import { MdAttachMoney, MdCheckCircle } from 'react-icons/md';

import Header from '../../components/Header';

import formatReal from '../../utils/formatReal';

import { Container, Content, ChartContainer, Box } from './styles';

const Dashboard: React.FC = () => {
  const [chart, setChart] = useState<ChartComponentProps>();

  useEffect(() => {
    setChart({
      data: {
        labels: [
          'Domingo',
          'Segunda',
          'Terça',
          'Quarta',
          'Quinta',
          'Sexta',
          'Sábado',
        ],
        datasets: [
          {
            label: 'Total de vendas',
            data: [30, 20, 8, 10, 30, 14, 25],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(74, 129, 122, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(74, 129, 122, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        legend: false,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                suggestedMax: 40,
              },
            },
          ],
        },
      },
    });
  }, []);

  return (
    <Container>
      <Header />

      <Content>
        <Box className="ticket">
          <GoGraph />
          <div>
            <h3>{formatReal(24.4)}</h3>
            <p>Ticket médio</p>
          </div>
        </Box>
        <Box className="amount">
          <MdAttachMoney />
          <div>
            <h3>{formatReal(24400)}</h3>
            <p>Total de vendas</p>
          </div>
        </Box>
        <Box className="orders">
          <MdCheckCircle />
          <div>
            <h3>1.2K</h3>
            <p>Total de comandas</p>
          </div>
        </Box>
        <ChartContainer>
          <h3>Vendas nos ultimos 7 dias</h3>
          {chart && <Bar data={chart.data} options={chart.options} />}
        </ChartContainer>
      </Content>
    </Container>
  );
};

export default Dashboard;

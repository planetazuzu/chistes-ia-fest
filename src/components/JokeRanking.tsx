
import React from 'react';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Star, TrendingUp } from 'lucide-react';
import { Joke } from '@/types/joke';

interface JokeRankingProps {
  rankingData: { joke: Joke, count: number }[];
}

const JokeRanking = ({ rankingData }: JokeRankingProps) => {
  // If there are no jokes yet, show a placeholder message
  if (rankingData.length === 0) {
    return (
      <div className="w-full max-w-2xl mx-auto mt-8 p-4 bg-white rounded-lg shadow text-center">
        <Star className="mx-auto text-amber-400 mb-2" />
        <h3 className="text-lg font-medium mb-2">Ranking de chistes</h3>
        <p className="text-sm text-gray-500">
          Todavía no hay suficientes datos para el ranking. ¡Pide más chistes!
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 bg-gradient-to-r from-joy-blue to-joy-yellow/50 flex items-center">
        <TrendingUp className="mr-2 text-joy-blue" />
        <h3 className="text-lg font-medium">Ranking de chistes más solicitados</h3>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">#</TableHead>
              <TableHead>Chiste</TableHead>
              <TableHead className="text-right w-20">Veces</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rankingData.map((item, index) => (
              <TableRow key={item.joke.id}>
                <TableCell className="font-medium">
                  {index + 1}
                </TableCell>
                <TableCell className="max-w-xs truncate">
                  {/* Truncate joke text for display in the table */}
                  {item.joke.text.length > 70 
                    ? `${item.joke.text.substring(0, 70)}...` 
                    : item.joke.text}
                </TableCell>
                <TableCell className="text-right">
                  {item.count}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default JokeRanking;

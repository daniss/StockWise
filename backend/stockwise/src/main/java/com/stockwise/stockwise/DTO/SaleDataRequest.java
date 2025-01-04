package com.stockwise.stockwise.DTO;

//interface SalesData {
//    totalSales: number
//    orderCount: number
//    revenueGrowth: number
//    bestSeller: string
//    recentOrders: Order[]
//    monthlyTrends: MonthlyTrend[]
//}

import com.stockwise.stockwise.Model.MonthlyTrends;
import com.stockwise.stockwise.Model.Sale;

import java.util.List;

public class SaleDataRequest {
    private Double totalSales;
    private Integer orderCount;
    private Double revenueGrowth;
    private String bestSeller;
    private List<Sale> recentOrders;
    private List<MonthlyTrends> monthlyTrends;

    public SaleDataRequest() {
    }

    public SaleDataRequest(Double totalSales, Integer orderCount, Double revenueGrowth, String bestSeller, List<Sale> recentOrders, List<MonthlyTrends> monthlyTrends) {
        this.totalSales = totalSales;
        this.orderCount = orderCount;
        this.revenueGrowth = revenueGrowth;
        this.bestSeller = bestSeller;
        this.recentOrders = recentOrders;
        this.monthlyTrends = monthlyTrends;
    }

    public Double getTotalSales() {
        return totalSales;
    }

    public void setTotalSales(Double totalSales) {
        this.totalSales = totalSales;
    }

    public Integer getOrderCount() {
        return orderCount;
    }

    public void setOrderCount(Integer orderCount) {
        this.orderCount = orderCount;
    }

    public Double getRevenueGrowth() {
        return revenueGrowth;
    }

    public void setRevenueGrowth(Double revenueGrowth) {
        this.revenueGrowth = revenueGrowth;
    }

    public String getBestSeller() {
        return bestSeller;
    }

    public void setBestSeller(String bestSeller) {
        this.bestSeller = bestSeller;
    }

    public List<Sale> getRecentOrders() {
        return recentOrders;
    }

    public void setRecentOrders(List<Sale> recentOrders) {
        this.recentOrders = recentOrders;
    }

    public List<MonthlyTrends> getMonthlyTrends() {
        return monthlyTrends;
    }

    public void setMonthlyTrends(List<MonthlyTrends> monthlyTrends) {
        this.monthlyTrends = monthlyTrends;
    }
}



---
title: C++七大经典排序算法详解
date: 2024-01-30 23:37:20
categories: 竞赛
tags: 
- C++
- 排序算法
---

# C++七大经典排序算法详解（转）

前言：排序是将一组数据，按照指定的顺序或要求来进行排列的过程。是数据结构相关课程和内容较为重要和核心的内容之一，常常作为考试题和面试题目来考察学生和面试者，因此熟练掌握经典的[排序算法](https://so.csdn.net/so/search?q=%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95&spm=1001.2101.3001.7020)原理和代码实现是非常重要的
本文介绍了几大较为经典的排序算法：插入、希尔、选择、堆、冒泡、快速和归并排序

各种排序算法动图解析[请参考](https://www.cnblogs.com/onepixel/articles/7674659.html)

![202ceb2dbe9af3db167f6e079a4317160c7181050244f2d7e6c6bc76bb4ade42.png (1355×904) (zshfoj.com)](https://img.zshfoj.com/202ceb2dbe9af3db167f6e079a4317160c7181050244f2d7e6c6bc76bb4ade42.png)

**各种排序算法复杂度对比**
[冒泡排序](https://so.csdn.net/so/search?q=%E5%86%92%E6%B3%A1%E6%8E%92%E5%BA%8F&spm=1001.2101.3001.7020)：两两比较，将大的元素不断后移；
选择排序：在一次遍历中，选择最小的元素，和从起始位置开始的元素交换；
插入排序：选择一个元素，若此元素比前一个元素大，while循环不断左移找到它的位置。
希尔排序：在插入排序的基础之上加入了一个gap步长进行排序
归并排序：数组分治，将有序的子数组合并
快速排序：在数组中选择一个基准找到它的位置，接着从基准的两边采用同样的方法分治。
堆排序：先对整个数组构建大顶堆，接着从根节点开始不断调整。

## 冒泡排序法

冒泡排序是所有排序算法中相对简单且容易理解的算法，它的核心思想：通过for循环不断遍历需要排序的元素，依次比较相邻的两个元素，若不满足指定的顺序（可以从大到小排序，也可以反过来），就交换两个元素，直至完成排序。

* 1.比较相邻的元素。如果第一个比第二个大，就交换它们两个；
* 2.对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对，这样在最后的元素应该会是最大的数；
* 3.针对所有的元素重复以上的步骤，除了最后一个；
* 4.重复步骤1\~3，直到排序完成。

```cpp
void BubbleSort(int arr[], int n)
{
    for (int i = 0; i < n - 1; i++)
	{
            for (int j = 0; j < n - i - 1; j++)
	        {
                    if (arr[j] > arr[j + 1]) 
			{
                            int temp = arr[j];
                            arr[j] = arr[j + 1];
                            arr[j + 1] = temp;
                        }
                 }
         }
}
```

#### **冒泡排序优化：**

用一个bool类型的变量来作为标志位，标记在某一轮遍历中是否发生过元素交换，如果未发生元素交换则证明当前数组已经排序完毕，直接中断此次循环。

```cpp
void BubbleSort(int arr[], int n)
{
    for (int i = 0; i < n - 1; i++)
	{
			//如果用一个flag来判断当前数组是否已经有序,有序则退出循环
			bool flag = true;
            for (int j = 0; j < n - i - 1; j++)
	        {
                    if (arr[j] > arr[j + 1]) 
					{
                            int temp = arr[j];
                            arr[j] = arr[j + 1];
                            arr[j + 1] = temp;
                            flag = false;
                     }
             }
             if (flag) break;
     }
}
```

## 选择排序

选择排序(Selection-sort)是一种简单直观的排序算法。它的工作原理：首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置，然后，再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。以此类推，直到所有元素均排序完毕。

* 1.初始状态：无序区为R[1…n]，有序区为空；
* 2.第i趟排序(i=1,2,3…n-1)开始时，当前有序区和无序区分别为R[1…i-1]和R(i…n）。该趟排序从当前无序区中-选出关键字最小的记录 R[k]，将它与无序区的第1个记录R交换，使R[1…i]和R[i+1…n)分别变为记录个数增加1个的新有序区和记录个数减少1个的新无序区；
* 3.n-1趟结束，数组有序化了。

```cpp
void SelectionSort(int arr[],int len)
{
	for(int i = 0; i < len; i++)
	{
		int min = i;
		for(j = i + 1; j < len; j++)
		{
			if(a[j] < a[min])
			min = j;
		}
		int temp = a[min];
		a[min] = a[i];
		a[i] = temp;
	}
}
```

## 插入排序

插入排序（Insertion-Sort）的算法描述是一种简单直观的排序算法。它的工作原理是通过构建有序序列，对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入。

* 1.从第一个元素开始，该元素可以认为已经被排序；
* 2.取出下一个元素，在已经排序的元素序列中从后向前扫描；
* 3.如果该元素（已排序）大于新元素，将该元素移到下一位置；
  -4.重复步骤3，直到找到已排序的元素小于或者等于新元素的位置；
* 5.将新元素插入到该位置后；
* 6.重复步骤2\~5。

```cpp
void insertSort(int a[], int n)
{
   for(int i = 1; i < n; i++) //第一个元素作为基准元素，从第二个元素开始把其插到正确的位置
   {
	  if(a[i] < a[i-1]) //如果第i个元素比前面的元素小
	  {
	      int j = i-1;     //需要判断第i个元素与前面的多个元素的大小，换成j继续判断
          int x = a[i]; //将第i个元素复制为哨兵
	      while(j >= 0 && x < a[j]) //找哨兵的正确位置，比哨兵大的元素依次后移
	      {
             a[j+1] = a[j]; 
	         j--;
	      }
	      a[j+1] = x;  //把哨兵插入到正确的位置
	  }   
   }
}
```

## 希尔排序

简单插入排序的改进版。它与插入排序的不同之处在于，它会优先比较距离较远的元素。希尔排序又叫缩小增量排序。
先将整个待排序的记录序列分割成为若干子序列分别进行直接插入排序，具体算法描述：

* 1.选择一个增量序列t1，t2，…，tk，其中ti>tj，tk=1；
* 2.按增量序列个数k，对序列进行k 趟排序；
* 3.每趟排序，根据对应的增量ti，将待排序列分割成若干长度为m 的子序列，分别对各子表进行直接插入排序。仅增量因子为1 时，整个序列作为一个表来处理，表长度即为整个序列的长度。

```cpp
void shellSort(int a[], int n)  //a -- 待排序的数组, n -- 数组的长度
{
    int i,j,gap;   // gap为步长，每次减为原来的一半。
    for (gap = n / 2; gap > 0; gap /= 2)
    {
        // 共gap个组，对每一组都执行直接插入排序
        for (i = 0 ;i < gap; i++)
        {
            for (j = i + gap; j < n; j += gap) 
            { 
                // 如果a[j] < a[j-gap]，则寻找a[j]位置，并将后面数据的位置都后移。
                if (a[j] < a[j - gap])
                {
                    int tmp = a[j];
                    int k = j - gap;
                    while (k >= 0 && a[k] > tmp)
                    {
                        a[k + gap] = a[k];
                        k -= gap;
                    }
                    a[k + gap] = tmp;
                }
            }
        }
    }
}
```

```cpp
void shellsort(int arr[], int n) {
	for (int gap = n; gap >= 1; gap /= 2) {
		for (int i = gap; i < n; i += gap) {
			int temp = arr[i];
			int pre = i - gap;
			while (pre >= 0 && arr[pre] > temp) {
				arr[i] = arr[pre];
				pre -= gap;
			}
			arr[pre + gap] = temp;
		}
	}
}
```

## 归并排序

归并排序是建立在归并操作上的一种有效的排序算法。该算法是采用分治法（Divide and Conquer）的一个非常典型的应用。将已有序的子序列合并，得到完全有序的序列；即先使每个子序列有序，再使子序列段间有序。若将两个有序表合并成一个有序表，称为2-路归并。

* 1.把长度为n的输入序列分成两个长度为n/2的子序列；
* 2.对这两个子序列分别采用归并排序；
* 3.将两个排序好的子序列合并成一个最终的排序序列。

```cpp
/* 初始版本，升序排序 */
/* 时间复杂度：O(nlbn) 将n个待排序记录归并次数为lbn，一趟归并O(n)
   空间复杂度：O(n) 递归栈最大深度为[lbn] + 1 ，而辅助数组大小为n
   稳定：无论最好还是最坏情况时间复杂度都是O(nlbn)
*/
 
void Merge(int arr[], int n)
{
    int temp[n]; // 用一个额外的数组来进行排序
    int b = 0; // 额外数组的起始位置
    int mid = n / 2; // mid将数组从中间划分，前后两半都有序
    int first = 0, second = mid; // 两个有序序列的起始位置
 	//以下操作类似于将两个数组合并为一个有序数组
    while (first < mid && second < n)
    {
        if (arr[first] <= arr[second]) // 比较两个序列
        	//这步操作相当于把第一个数组的值放到用来排序的数组，接着两个指针后移对下一个值进行操作
            temp[b++] = arr[first++];
        else
            temp[b++] = arr[second++];
    }
 
    while(first < mid)  // 将剩余子序列复制到辅助序列中
            temp[b++] = arr[first++];
    while(second < n)
            temp[b++] = arr[second++];
    for (int i = 0; i < n; ++i) // 辅助序列复制到原序列
        arr[i] = temp[i];
}
 
void MergeSort(int arr[], int n)
{
    if (n <= 1) // 递归出口
        return;
    if (n > 1)
    {
        MergeSort(arr, n / 2); // 对前半部分进行归并排序
        MergeSort(arr + n / 2, n - n / 2); // 对后半部分进行归并排序
        Merge(arr, n); // 归并两部分
    }
}
```

## 快速排序（Quick Sort）

快速排序的基本思想：通过一趟排序将待排记录分隔成独立的两部分，其中一部分记录的关键字均比另一部分的关键字小，则可分别对这两部分记录继续进行排序，以达到整个序列有序。
快速排序使用分治法来把一个串（list）分为两个子串（sub-lists）。具体算法描述如下：

* 1.从数列中挑出一个元素，称为 “基准”（pivot）；
* 2.重新排序数列，所有元素比基准值小的摆放在基准前面，所有元素比基准值大的摆在基准的后面（相同的数可以到任一边）。在这个分区退出之后，该基准就处于数列的中间位置。这个称为分区（partition）操作；
* 3.递归地（recursive）把小于基准值元素的子数列和大于基准值元素的子数列排序。

```cpp
void Quicksort(int arr[], int low, int high) {
	if (low < high) {
		//双指针，一个指向数组起始，一个指向数组末尾
		int i = low;
		int j = high;
		//将数组的第一个元素作为key寻找它的位置
		//key找到它的位置后，以它为分界线，左右两个数组分治
		int key = arr[i];
		while (i < j) {
			//两个指针不相遇，且指针指向的值大于key时，不断左移
			while (i < j && arr[j] >= key)
				j--;
			if (i < j) arr[i] = arr[j];
			//两个指针不相遇，且指针指向的值小于key时，不断右移
			while (i < j && arr[i] <= key)
				i++;
			if (i < j) arr[j] = arr[i];
		}
		//将key放在适合的位置
		arr[i] = key;
		//分治
		Quicksort(arr, low, i - 1);
		Quicksort(arr, i + 1, high);
	}
}
```

## 堆排序（Heap Sort）

堆排序（Heapsort）是指利用堆这种数据结构所设计的一种排序算法。堆积是一个近似完全二叉树的结构，并同时满足堆积的性质：即子结点的键值或索引总是小于（或者大于）它的父节点。

* 1.将初始待排序关键字序列(R1,R2….Rn)构建成大顶堆，此堆为初始的无序区；
* 2.将堆顶元素R[1]与最后一个元素R[n]交换，此时得到新的无序区(R1,R2,……Rn-1)和新的有序区(Rn),且满足R[1,2…n-1]<=R[n]；
* 3.由于交换后新的堆顶R[1]可能违反堆的性质，因此需要对当前无序区(R1,R2,……Rn-1)调整为新堆，然后再次将R[1]与无序区最后一个元素交换，得到新的无序区(R1,R2….Rn-2)和新的有序区(Rn-1,Rn)。不断重复此过程直到有序区的元素个数为n-1，则整个排序过程完成。

```cpp
// Heapsort.cpp : 定义控制台应用程序的入口点。
//
 
#include "stdafx.h"
#include<iostream>
using namespace std;
void swap(int arr[], int a, int b)		//交换元素；
{
	int temp = arr[a];
	arr[a] = arr[b];
	arr[b] = temp;
}
void adjustHeap(int arr[], int i, int length)		//调整大顶堆（仅是调整过程，建立在大顶堆已构建的基础上）
{
	int temp = arr[i];//先取出当前元素i
	for (int k = i * 2 + 1; k<length; k = k * 2 + 1)//从i结点的左子结点开始，也就是2i+1处开始
	{
		if (k + 1<length&&arr[k]<arr[k + 1])//如果左子结点小于右子结点，k指向右子结点
		{
			k++;
		}
		if (arr[k] >temp)//如果子节点大于父节点，将子节点值赋给父节点（不用进行交换）
		{
			arr[i] = arr[k];
			i = k;
		}
		else
		{
			break;
		}
	}
	arr[i] = temp;//将temp值放到最终的位置
}
void Heapsort(int arr[], int length)
{
	//1.构建大顶堆
	for (int i = length / 2 - 1; i >= 0; i--)
	{
		//从第一个非叶子结点从下至上，从右至左调整结构
		adjustHeap(arr, i, length);
	}
	for (int j = length - 1; j>0; j--)
	{
		swap(arr, 0, j);//将堆顶元素与末尾元素进行交换
		adjustHeap(arr, 0, j);//重新对堆进行调整
	}
 
}
int main()
{
	int arr[9] = { 9,8,7,6,10,4,3,2,1 };
	Heapsort(arr, 9);
	for (int i = 0; i<9; i++)
		cout << arr[i] << " ";
	cout << endl;
	return 0;
}
```

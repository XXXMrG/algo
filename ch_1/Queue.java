/**
 * 队列实现（链表结构）
 * edit by keith
 * 2018/12/6
 */
package ch_1;

import java.util.Iterator;

public class Queue<Item> implements Iterable<Item>{
    private Node first;
    private Node last;
    private int N;
    private class Node{
        Item item;
        Node next;
    }

    public boolean isEmpty(){
        return first == null;
    }

    public int size(){
        return N;
    }

    public void enqueue(Item item){
        Node oldlast = last;
        last = new Node();
        last.item = item;
        last.next = null;
        if(isEmpty()){
            first = last;
        }else{
            oldlast.next = last;
        }
        N++;
    }

    public Item dequeue(){
        Item item = first.item;
        first = first.next;
        if(isEmpty())
            last = null;
        N--;
        return item;
    }

    @Override
    public Iterator<Item> iterator() {
        return new ListIterator() ;
    }

    private class ListIterator implements Iterator<Item>{
        private Node current = first;
        @Override
        public boolean hasNext() {
            return current != null;
        }

        @Override
        public Item next() {
            Item item = current.item;
            current = current.next;
            return item;
        }
    }
}

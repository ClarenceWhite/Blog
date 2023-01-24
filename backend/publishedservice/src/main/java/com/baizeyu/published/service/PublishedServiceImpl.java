package com.baizeyu.published.service;

import com.baizeyu.published.model.Published;
import com.baizeyu.published.repository.PublishedRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class PublishedServiceImpl implements PublishedService {

    @Autowired
    PublishedRepository publishedRepository;

    @Override
    public Map<String, Date> getAllPublished(){
        List<Published> allArticles = publishedRepository.findAll();
        Map<String, Date> allTitleDate = new HashMap<>();
        for (Published article : allArticles) {
            allTitleDate.put(article.getTitle(), article.getPublish_date());
        }
        return allTitleDate;
    }

    @Override
    public Published getPublishedByTitle(String title){
        return publishedRepository.getPublishedByTitle(title);
    }

    @Override
    public Map<String, Date> getPublishedByCategory(String category){
        List<Published> all = publishedRepository.findAllByCategory(category);
        Map<String, Date> all_title_date = new HashMap<>();
        for (Published article : all) {
            all_title_date.put(article.getTitle(), article.getPublish_date());
        }
        return all_title_date;
    }

    @Override
    public Published publishArticle(Published article){
        return publishedRepository.save(article);
    }

    @Override
    public Boolean updateArticle(Published newArticle, String old_title){

        // retrieve the article by old_title
        Published foundedArticle = publishedRepository.getPublishedByTitle(old_title);

        // check if the new title conflicts with other existing ones
        Set<String> existingTitles = getAllPublished().keySet();

        if (existingTitles.contains(newArticle.getTitle()) && !old_title.equals(newArticle.getTitle())) {
            return false;
        } else {
            // delete old article first
            publishedRepository.delete(foundedArticle);

            // save new article then
            publishedRepository.save(newArticle);
            return true;
        }
    }

    @Override
    public Boolean deleteArticle(String title){
        //check if the title exists
        Set<String> all_titles = getAllPublished().keySet();
        if (all_titles.contains(title)) {
            publishedRepository.deletePublishedByTitle(title);
            return true;
        } else {
            return false;
        }
    }

}

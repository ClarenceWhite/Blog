package com.baizeyu.published.service;

import com.baizeyu.published.model.Published;

import java.util.Date;
import java.util.Map;


public interface PublishedService {

    Map<String, Date> getAllPublished();

    Published getPublishedByTitle(String title);

    Map<String, Date> getPublishedByCategory(String category);

    Published publishArticle(Published article);

    Boolean updateArticle(Published newArticle, String old_title);

    Boolean deleteArticle(String title);

}

class PortfolioRouter(object):
    """
    A router to control all database operations on models in
    the portfoliojobs application
    """
 
    def db_for_read(self, model, **hints):
        """
        Point all operations on portfoliojobs models to 'portfolio_db'
        """
        if model._meta.app_label == 'portfoliojobs':
            return 'portfolio_db'
        return None
 
    def db_for_write(self, model, **hints):
        """
        Point all operations on portfoliojobs models to 'other'
        """
        if model._meta.app_label == 'portfoliojobs':
            return 'portfolio_db'
        return None
 
    def allow_syncdb(self, db, model):
        """
        Make sure the 'portfoliojobs' app only appears on the 'other' db
        """
        if db == 'portfolio_db':
            return model._meta.app_label == 'portfoliojobs'
        elif model._meta.app_label == 'portfoliojobs':
            return False
        return None